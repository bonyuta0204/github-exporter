import { run } from '../src/run'

import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest'

describe('run', () => {
  vi.mock('@apollo/client/index.js', () => {
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

  it('should run', () => {
    /** we just want to ensure that `run` does not throw any errors */
    expect(() =>
      run({
        owner: 'owner',
        repo: 'repo',
        path: 'path',
        limit: 100
      })
    ).not.toThrow()
  })
})
