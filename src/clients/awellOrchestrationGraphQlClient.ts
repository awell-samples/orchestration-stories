import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/api/orchestration-proxy',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          patients: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(existing = [], incoming) {
              const updatedResponse = {
                patients: [...(incoming.patients || [])],
                pagination: incoming.pagination,
                sorting: incoming.sorting,
              }

              return updatedResponse
            },
          },
        },
      },
    },
  }),
  headers: {
    apiKey: process.env.NEXT_PUBLIC_SANDBOX_GRAPHQL_API_KEY || '',
  },
})

export default client
