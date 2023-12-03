import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client'

import { gql } from '../types/__generated__/gql'

const GET_PULL_REQUESTS = gql(/* GraphQL */ `
  query GetPullRequestStats($repoName: String!, $repoOwner: String!) {
    repository(name: $repoName, owner: $repoOwner) {
      pullRequests(last: 100) {
        totalCount
        nodes {
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
    }
  }
`)

export async function getPullRequestStats(
  client: ApolloClient<NormalizedCacheObject>,
  repoOwner: string,
  repoName: string
) {
  const response = await client.query({
    query: GET_PULL_REQUESTS,
    variables: {
      repoName: repoName,
      repoOwner: repoOwner
    }
  })

  return response.data.repository?.pullRequests.nodes
}
