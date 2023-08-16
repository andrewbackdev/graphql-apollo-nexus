import { inputObjectType } from 'nexus'
import { Post } from '../post'

export const CreateCommentInput = inputObjectType({
  name: 'CreateCommentInput',
  definition(t) {
    t.nonNull.int('postId')
    t.nonNull.string('text')
  },
})

export const UpdateCommentInput = inputObjectType({
  name: 'UpdateCommentInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('text')
  },
})

export const DeleteCommentInput = inputObjectType({
  name: 'DeleteCommentInput',
  definition(t) {
    t.nonNull.int('id')
  },
})
