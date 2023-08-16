import { makeSchema } from 'nexus'
import * as UserTypes from './user'
import * as PostTypes from './post'
import * as CommentTypes from './comment'
import * as SharedTypes from './shared'

export const schema = makeSchema({
  types: {
    ...UserTypes,
    ...PostTypes,
    ...CommentTypes,
    ...SharedTypes,
  },
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
