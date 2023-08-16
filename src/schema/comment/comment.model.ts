import { Context } from '@context'
import { Post, User } from '@prisma/client'
import { objectType } from 'nexus'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('text')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('post', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post.findUnique({
          where: { id: parent.id || undefined },
        }) as Promise<Post>
      },
    })
    t.nonNull.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author() as Promise<User>
      },
    })
  },
})
