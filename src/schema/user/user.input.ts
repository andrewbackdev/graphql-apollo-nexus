import { inputObjectType } from 'nexus'

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('password')
  },
})

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const DeleteUserInput = inputObjectType({
  name: 'DeleteUserInput',
  definition(t) {
    t.nonNull.int('id')
  },
})
