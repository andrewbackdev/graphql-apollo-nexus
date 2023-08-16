import { Context } from '@context'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {
  arg,
  mutationField,
  nonNull,
  queryField,
  stringArg,
  intArg,
} from 'nexus'
import { AuthPayload } from './user.output'
import { getUser } from '../user/user.utils'
import { User } from '@prisma/client'

const SaltRounds = 10
const jwtSecret = 'aisda'

async function hashPassword(password: string) {
  return bcrypt.hash(password, SaltRounds)
}

interface JwtPayload {
  id: number
}

function generateJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtSecret)
}

export const users = queryField((t) => {
  t.nonNull.list.nonNull.field('users', {
    type: 'User',
    args: {
      first: intArg(),
      skip: intArg(),
      after: intArg(),
      orderBy: intArg(),
      query: stringArg(),
    },
    resolve: (_parent, args, context: Context) => {
      const { first, skip, after, orderBy, query } = args
      const opArgs: any = {
        first,
        skip,
        after,
        orderBy,
      }

      if (query) {
        opArgs.where = {
          OR: [
            {
              name_contains: args.query,
            },
          ],
        }
      }

      return context.prisma.user.findMany(opArgs)
    },
  })
})

export const myPosts = queryField((t) => {
  t.nonNull.list.nonNull.field('myPosts', {
    type: 'Post',
    args: {
      first: intArg(),
      skip: intArg(),
      after: intArg(),
      orderBy: intArg(),
      query: stringArg(),
    },
    resolve: async (_parent, args, context: Context) => {
      const { first, skip, after, orderBy, query } = args
      const { id: userId } = (await getUser(context)) as User

      const opArgs: any = {
        first: first,
        skip: skip,
        after: after,
        orderBy: orderBy,
        where: {
          author: {
            id: userId,
          },
        },
      }

      if (query) {
        opArgs.where.OR = [
          {
            title_contains: query,
          },
          {
            body_contains: query,
          },
        ]
      }

      return context.prisma.post.findMany(opArgs)
    },
  })
})

export const me = queryField((t) => {
  t.nonNull.field('me', {
    type: 'User',
    resolve: async (_parent, _args, context: Context) => {
      const user = (await getUser(context)) as User

      return context.prisma.user.findUnique({
        where: {
          id: user.id,
        },
      }) as Promise<User>
    },
  })
})

export const createUser = mutationField((t) => {
  t.nonNull.field('createUser', {
    type: AuthPayload,
    args: {
      data: nonNull(
        arg({
          type: 'CreateUserInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { email, username, password } = data

      const existedUser = await context.prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      })

      if (existedUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await hashPassword(password)

      const user = await context.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      const token = generateJwtToken({ id: user.id })

      return {
        user,
        jwt: token,
      }
    },
  })
})

export const login = mutationField((t) => {
  t.nonNull.field('login', {
    type: AuthPayload,
    args: {
      data: nonNull(
        arg({
          type: 'LoginUserInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, { prisma }: Context) => {
      const { username, password } = data

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      })

      if (!user) {
        throw new Error('Unable to login')
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
        throw new Error('Unable to login')
      }

      const jwt = generateJwtToken({ id: user.id })

      return {
        user,
        jwt,
      }
    },
  })
})

export const deleteUser = mutationField((t) => {
  t.nonNull.field('deleteUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: 'DeleteUserInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, { prisma }: Context) => {
      const { id } = data

      const user = await prisma.user.delete({
        where: {
          id,
        },
      })

      if (!user) {
        throw new Error('Unable to delete')
      }

      return user
    },
  })
})

export const updateUser = mutationField((t) => {
  t.nonNull.field('updateUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: 'UpdateUserInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, { prisma }: Context) => {
      const { id, ...updateData } = data
      const { password } = updateData

      if (password) {
        updateData.password = await hashPassword(password)
      }

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      })

      return user
    },
  })
})
