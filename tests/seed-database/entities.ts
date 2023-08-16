import { Post, User, Comment } from '@prisma/client'

const password = 'password123'

type UserData = Pick<User, 'username' | 'email' | 'password'>
type PostData = Pick<Post, 'title' | 'body' | 'published'>
type CommentData = Pick<Comment, 'text'>

// User One
export const userOneData: UserData = {
  username: 'Alice',
  email: 'alice@prisma.io',
  password,
}

export const postOneData: PostData = {
  title: 'Join the Prisma Slack',
  body: 'https://slack.prisma.io',
  published: true,
}

export const commentOneData: CommentData = {
  text: 'I like prisma',
}

// User Two
export const userTwoData: UserData = {
  username: 'reactor',
  email: 'reactor@example.com',
  password,
}

export const postTwoData: PostData = {
  title: 'My favorite ORM',
  body: 'https://slack.prisma.io',
  published: true,
}

export const commentTwoData: CommentData = {
  text: 'I like ORM',
}
