import './core/tsconfig-paths'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { Context, createContext } from './context'

interface ServerArgs {
  port?: number
  allowLogger?: boolean
}

const start = async (
  { port = 4000, allowLogger = true }: ServerArgs = {} as any,
) => {
  const server = new ApolloServer<Context>({ schema })

  const { url } = await startStandaloneServer(server, {
    context: createContext as any,
    listen: { port: port },
  })

  if (allowLogger) {
    console.log(`\
    🚀 Server ready at: ${url}
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-nexus#using-the-graphql-api
    `)
  }

  return server
}

export default {
  start,
}
