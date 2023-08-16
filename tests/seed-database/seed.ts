import { PrismaClient, Post, User, Comment } from '@prisma/client'
import {
  hashPassword,
  generateJwtToken,
} from '../../src/schema/auth/auth.utils'
import {
  userOneData,
  postOneData,
  commentOneData,
  userTwoData,
  postTwoData,
  commentTwoData,
} from './entities'

const prisma = new PrismaClient()

interface UserWithJwt extends User {
  jwt: string
}

const partialUserOne: Partial<UserWithJwt> = {}

const partialPostOne: Partial<Post> = {
  ...postOneData,
}

const partialCommentOne: Partial<Comment> = {
  ...commentOneData,
}

const partialUserTwo: Partial<UserWithJwt> = {}

const partialPostTwo: Partial<Post> = {
  ...postTwoData,
}

const partialCommentTwo: Partial<Comment> = {
  ...commentTwoData,
}

export const userOne: UserWithJwt = partialUserOne as UserWithJwt
export const postOne: Post = partialPostOne as Post
export const commentOne: Comment = partialCommentOne as Comment

export const userTwo: UserWithJwt = partialUserTwo as UserWithJwt
export const postTwo: Post = partialPostTwo as Post
export const commentTwo: Comment = partialCommentTwo as Comment

export async function seedDatabase() {
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  const [createdUserOne, createdUserTwo] = await Promise.all([
    prisma.user.create({
      data: {
        ...userOneData,
        password: await hashPassword(userOneData.password),
      },
    }),
    prisma.user.create({
      data: {
        ...userTwoData,
        password: await hashPassword(userTwoData.password),
      },
    }),
  ])

  const [createdPostOne, createdPostTwo] = await Promise.all([
    prisma.post.create({
      data: {
        ...postOneData,
        author: {
          connect: {
            id: createdUserOne.id,
          },
        },
      },
    }),
    prisma.post.create({
      data: {
        ...postTwoData,
        author: {
          connect: {
            id: createdUserTwo.id,
          },
        },
      },
    }),
  ])

  const [createdCommentOne, createdCommentTwo] = await Promise.all([
    prisma.comment.create({
      data: {
        ...commentOneData,
        author: {
          connect: {
            id: createdUserOne.id,
          },
        },
        post: {
          connect: {
            id: createdPostOne.id,
          },
        },
      },
    }),
    prisma.comment.create({
      data: {
        ...commentTwoData,
        author: {
          connect: {
            id: createdUserTwo.id,
          },
        },
        post: {
          connect: {
            id: createdPostTwo.id,
          },
        },
      },
    }),
  ])

  // User one
  const jwtOne = generateJwtToken({ id: createdUserOne.id })
  Object.assign(partialUserOne, {
    ...createdUserOne,
    password: userOneData.password,
    jwt: jwtOne,
  })
  Object.assign(partialPostOne, createdPostOne)
  Object.assign(partialCommentOne, createdCommentOne)

  // User two
  const jwtTwo = generateJwtToken({ id: createdUserTwo.id })
  Object.assign(partialUserTwo, {
    ...createdUserTwo,
    password: userTwoData.password,
    jwt: jwtTwo,
  })
  Object.assign(partialPostTwo, createdPostTwo)
  Object.assign(partialCommentTwo, createdCommentTwo)
}
