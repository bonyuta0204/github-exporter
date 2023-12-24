import { run } from '../src/run'

describe('run', () => {
  jest.mock('@apollo/client/index.js', () => {
    class InMemoryCache {
      constructor() {}
    }

    class AppolloClient {
      constructor() {}

      query() {
        return {
          data: {
            repository: {
              pullRequests: {
                pageInfo: {
                  hasNextPage: false,
                  endCursor: 'endCursor'
                },
                edges: [
                  {
                    node: {
                      id: 'id'
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }

    return {
      ApolloClient: AppolloClient,
      InMemoryCache: InMemoryCache
    }
  })

  it('should run', async () => {
    /** we just want to ensure that `run` does not throw any errors */
    expect(
      await run({
        owner: 'owner',
        repo: 'repo',
        limit: 100
      })
    ).toBeUndefined()
  })
})
