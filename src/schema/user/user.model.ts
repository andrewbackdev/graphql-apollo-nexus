import { objectType } from 'nexus'
import { Context } from '../../context'
import { Post } from '@prisma/client'
import { getUser } from './user.utils'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.string('password', {
      resolve: async (parent: any, _, context: Context) => {
        return null
      },
    })
    t.string('email', {
      resolve: async (parent: any, _, context: Context) => {
        const user = await getUser(context, false)

        return user?.id === parent.id ? parent.email : null
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.list.nonNull.field('comments', {
      type: 'Post',
      resolve: async (parent, _, context: Context) => {
        const comments = await context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .comments()

        if (!comments) {
          throw new Error('123')
        }

        return [] as Post[]
      },
    })
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: async (parent, _, context: Context) => {
        const posts = await context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()

        if (!posts) {
          throw new Error('123')
        }

        return [] as Post[]
      },
    })
  },
})
