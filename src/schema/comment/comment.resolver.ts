import {
  arg,
  intArg,
  mutationField,
  nonNull,
  queryField,
  stringArg,
} from 'nexus'
import { Context } from '@context'
import { getUser } from '../user/user.utils'
import { User } from '@prisma/client'

export const comments = queryField((t) => {
  t.nonNull.list.nonNull.field('comments', {
    type: 'Comment',
    args: {
      first: intArg(),
      skip: intArg(),
      after: intArg(),
      orderBy: intArg(),
    },
    resolve: async (_parent, args, context: Context) => {
      const { first, skip, after, orderBy } = args

      const opArgs: any = {
        first: first,
        skip: skip,
        after: after,
        orderBy: orderBy,
      }

      return context.prisma.comment.findMany(opArgs)
    },
  })
})

export const createComment = mutationField((t) => {
  t.field('createComment', {
    type: 'Comment',
    args: {
      data: nonNull(
        arg({
          type: 'CreateCommentInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { postId, ...createData } = data
      const { prisma } = context
      const user = (await getUser(context)) as User
      const post = await prisma.post.findUnique({ where: { id: postId } })

      if (!post) {
        throw new Error('Unable to find post')
      }

      return prisma.comment.create({
        data: {
          ...createData,
          author: {
            connect: { id: user.id },
          },
          post: {
            connect: { id: post.id },
          },
        },
      })
    },
  })
})

export const updateComment = mutationField((t) => {
  t.field('updateComment', {
    type: 'Comment',
    args: {
      data: nonNull(
        arg({
          type: 'UpdateCommentInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { id, ...updateData } = data
      const { prisma } = context
      const user = (await getUser(context)) as User

      const comment = await prisma.comment.findUnique({
        where: { id, author: { id: user.id } },
      })
      if (!comment) {
        throw new Error('Unable to delete comment')
      }

      return prisma.comment.update({
        where: { id },
        data: {
          ...updateData,
        },
      })
    },
  })
})

export const deleteComment = mutationField((t) => {
  t.field('deleteComment', {
    type: 'Comment',
    args: {
      data: nonNull(
        arg({
          type: 'DeleteCommentInput',
        }),
      ),
    },
    resolve: async (_parent, { data }, context: Context) => {
      const { id } = data
      const { prisma } = context
      const user = (await getUser(context)) as User

      const comment = await prisma.comment.findUnique({
        where: { id, author: { id: user.id } },
      })
      if (!comment) {
        throw new Error('Unable to delete comment')
      }

      return prisma.comment.delete({
        where: { id },
      })
    },
  })
})
