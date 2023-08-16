import { createTestContext } from './__helpers'
import { userOne } from './seed-database'

const ctx = createTestContext()

it('Should create a new user', async () => {
  const { prisma, client } = ctx

  const data = {
    username: 'Checker',
    email: 'checker@example.com',
    password: 'password123',
  }

  const { createUser: authData }: any = await client.request(
    `#graphql
    mutation($data: CreateUserInput!) {
      createUser(data: $data) {
        jwt
        user {
          id
          email
          username
        }
      }
    }
  `,
    { data },
  )

  interface AuthData {
    jwt: string
    user: {
      id: number
      email: null
      username: string
    }
  }

  expect(authData).toMatchObject<AuthData>({
    jwt: expect.any(String),
    user: {
      id: expect.any(Number),
      email: null,
      username: data.username,
    },
  })

  const existsUser: any = await prisma.user.findUnique({
    where: { id: authData.user.id },
  })

  expect(existsUser.id).toEqual(expect.any(Number))
})

it('Should login with valid credentials', async () => {
  const { client } = ctx
  const data = {
    username: userOne.username,
    password: userOne.password,
  }

  const { login: loginData }: any = await client.request(
    `#graphql
    mutation($data: LoginUserInput!) {
      login(data: $data) {
        jwt
        user {
          id
          email
          username
        }
      }
    }
  `,
    { data },
  )

  expect(loginData.jwt).toEqual(expect.any(String))
})

it('Should not login with bad credentials', async () => {
  const { client } = ctx
  const data = {
    username: 'un-existed-user',
    email: 'null@example.com',
    password: 'password123',
  }

  await expect(
    client.request(
      `#graphql
      mutation($data: CreateUserInput!) {
        login(data: $data) {
          jwt
          user {
            id
            email
            username
          }
        }
      }
    `,
      { data },
    ),
  ).rejects.toThrow()
})

it('Should not signup user with invalid password', async () => {
  const { client } = ctx

  const data = {
    username: 'Checker',
    email: 'checker@example.com',
    password: 'short',
  }

  await expect(
    client.request(
      `#graphql
      mutation($data: CreateUserInput!) {
        login(data: $data) {
          jwt
          user {
            id
            email
            username
          }
        }
      }
    `,
      { data },
    ),
  ).rejects.toThrow()
})

it('Should fetch user profile', async () => {
  const { getClient } = ctx

  const { me: user }: any = await getClient(userOne.jwt).request(
    `#graphql
      query {
        me {
          id
          email
          username
        }
      }
    `,
  )

  interface User {
    id: number
    email: string
    username: string
  }

  expect(user).toMatchObject<User>({
    id: userOne.id,
    email: userOne.email,
    username: userOne.username,
  })
})

it('Should expose public author profiles', async () => {
  const { getClient } = ctx
  const { users }: any = await getClient().request(
    `#graphql
      query {
        users {
          id
          email
          username
        }
      }
    `,
  )

  expect(users.length).toBe(2)
  expect(users[0].email).toBe(null)
  expect(users[0].username).toEqual(expect.any(String))
})
