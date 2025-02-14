// eslint-disable-next-line @typescript-eslint/no-var-requires
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

module.exports = {
  overwrite: true,
  schema: {
    [process.env.GRAPHQL_API_URL ??
    'https://api.sandbox.awellhealth.com/orchestration/m2m/graphql']: {
      headers: {
        apiKey: process.env.GRAPHQL_API_KEY_NICKS_API_TENANT,
      },
    },
  },
  generates: {
    './src/types/generated/api.types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}
