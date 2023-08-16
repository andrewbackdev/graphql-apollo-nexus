import {
  arg,
  intArg,
  stringArg,
  nonNull,
  queryField,
  mutationField,
} from 'nexus'
import { Context } from '@context'
import { getUser } from '../user/user.utils'
import { User } from '@prisma/client'

export const posts = queryField((t) => {
  t.nonNull.list.nonNull.field('posts', {
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

      const opArgs: any = {
        first: first,
        skip: skip,
        after: after,
        orderBy: orderBy,
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

export const post = queryField((t) => {
  t.nonNull.field('post', {
    type: 'Post',
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_parent, args, context: Context) => {
      const { id } = args
      const user = await getUser(context)

      const post = await context.prisma.post.findFirst({
        where: {
          id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: user?.id,
              },
            },
          ],
        },
      })

      if (!post) {
        throw new Error('Post not found')
      }

      return post
    },
  })
})

export const createPost = mutationField((t) => {
  t.field('createPost', {
    type: 'Post',
    args: {
      data: nonNull(
        arg({
          type: 'CreatePostInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { prisma } = context
      const user = (await getUser(context)) as User

      const post = await prisma.post.create({
        data: {
          ...data,
          author: {
            connect: { id: user.id },
          },
        },
      })

      return post
    },
  })
})

export const updatePost = mutationField((t) => {
  t.field('updatePost', {
    type: 'Post',
    args: {
      data: nonNull(
        arg({
          type: 'UpdatePostInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { id, ...updateData } = data
      const { prisma } = context
      const user = (await getUser(context)) as User

      const post = await prisma.post.findUnique({
        where: { id, author: { id: user.id } },
      })
      if (!post) {
        throw new Error('Unable to delete post')
      }

      if (post.published && data.published === false) {
        await prisma.comment.deleteMany({
          where: {
            post: { id },
          },
        })
      }

      return prisma.post.update({
        where: { id },
        data: updateData as any,
      })
    },
  })
})

export const deletePost = mutationField((t) => {
  t.field('deletePost', {
    type: 'Post',
    args: {
      data: nonNull(
        arg({
          type: 'DeletePostInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { id } = data
      const { prisma } = context
      const user = (await getUser(context)) as User

      const post = await prisma.post.findUnique({
        where: { id, author: { id: user.id } },
      })

      if (!post) {
        throw new Error('Unable to delete post')
      }

      return prisma.post.delete({
        where: { id },
      })
    },
  })
})
