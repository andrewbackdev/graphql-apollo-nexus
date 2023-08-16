import { PrismaClient } from '@prisma/client'
import getPort, { makeRange } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import server from '../src/server'
import { seedDatabase } from './seed-database'

const prisma = new PrismaClient()
type TestContext = {
  client: GraphQLClient
  prisma: PrismaClient
  getClient: (token?: any) => GraphQLClient
}

export function createTestContext(): TestContext {
  let ctx = {} as TestContext
  const graphqlCtx = graphqlTestContext()

  beforeEach(async () => {
    const { port } = await graphqlCtx.before()
    const endpoint = `http://localhost:${port}`

    Object.assign(ctx, {
      client: new GraphQLClient(endpoint),
      prisma,
      getClient(token: any) {
        const options: any = {}

        if (token) {
          Object.assign(options, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
        }

        return new GraphQLClient(endpoint, options)
      },
    })
  })

  afterEach(async () => {
    await graphqlCtx.after()
  })

  return ctx
}

function graphqlTestContext() {
  let serverInstance: any = null

  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) })
      serverInstance = await server.start({ port, allowLogger: false })

      await seedDatabase()

      return { port }
    },
    async after() {
      await serverInstance?.stop()
    },
  }
}
