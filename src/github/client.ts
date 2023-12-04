import apollo from '@apollo/client'

/**
 * Returns an Apollo Client instance configured with the provided Github token.
 * @returns {ApolloClient} The configured Apollo Client instance.
 * @throws {Error} If the Github token is not provided in the environment variables.
 */
export const getClient = () => {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error('Please add your Github token to .env.local')
  }

  const client = new apollo.ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new apollo.InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return client
}
