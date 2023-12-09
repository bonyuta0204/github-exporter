import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client'

import { gql } from '../types/__generated__/gql'
import { buildPagingFunc, ProgressCallBack } from './pagination'

const GET_PULL_REQUESTS = gql(/* GraphQL */ `
  query GetPullRequestStats(
    $repoName: String!
    $repoOwner: String!
    $limit: Int!
    $cursor: String
  ) {
    repository(name: $repoName, owner: $repoOwner) {
      pullRequests(last: $limit, before: $cursor) {
        totalCount
        edges {
          node {
            id
            author {
              login
            }
            number
            closed
            title
            changedFiles
            createdAt
            merged
            mergedAt
            state
            additions
            deletions
          }
        }
        pageInfo {
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`)

export async function getPullRequestStats(
  client: ApolloClient<NormalizedCacheObject>,
  repoOwner: string,
  repoName: string,
  limit?: number,
  progressCallBack?: ProgressCallBack
) {
  const pagingFetch = buildPagingFunc(async (limit, cursor) => {
    const response = await client.query({
      query: GET_PULL_REQUESTS,
      variables: {
        repoOwner,
        repoName,
        limit,
        cursor
      }
    })

    return {
      items:
        response.data.repository?.pullRequests.edges?.map(
          (edge) => edge?.node
        ) ?? [],
      cursor:
        response.data.repository?.pullRequests.pageInfo.startCursor ??
        undefined,
      hasNext:
        response.data.repository?.pullRequests.pageInfo.hasPreviousPage ??
        false,
      totalCount: response.data.repository?.pullRequests.totalCount
    }
  })

  const pulls = await pagingFetch([], true, undefined, limit, progressCallBack)
  return pulls.items
}
