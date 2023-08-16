import { inputObjectType } from 'nexus'

export const CreatePostInput = inputObjectType({
  name: 'CreatePostInput',
  definition(t) {
    t.nonNull.string('title')
    t.nonNull.string('body')
    t.nonNull.boolean('published')
  },
})

export const UpdatePostInput = inputObjectType({
  name: 'UpdatePostInput',
  definition(t) {
    t.nonNull.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  },
})

export const DeletePostInput = inputObjectType({
  name: 'DeletePostInput',
  definition(t) {
    t.nonNull.int('id')
  },
})

export const CreatedPostInput = inputObjectType({
  name: 'CreatedPostInput',
  definition(t) {
    t.nonNull.int('authorId')
  },
})
