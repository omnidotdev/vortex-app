import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5555/graphql', // PostGraphile v5 GraphQL endpoint
  documents: 'src/**/*.{ts,tsx,graphql,gql}',
  ignoreNoDocuments: true,
  generates: {
    'src/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: 'graphql-request',
        reactQueryVersion: 5,
        addInfiniteQuery: true,
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['bun run format'],
  },
}

export default config
