import { gql } from '@apollo/client'
import { getClient } from './github/client'

function main() {
  const client = getClient()
  client
    .query({
      query: gql`
        query {
          repository(name: "zelda-kpiee", owner: "f-scratch") {
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
      `
    })
    .then((result) => console.log(JSON.stringify(result)))
}

main()
