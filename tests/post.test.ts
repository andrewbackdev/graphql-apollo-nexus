import { createTestContext } from './__helpers'
import { userOne, postOne } from './seed-database'

const ctx = createTestContext()

it('Should expose published posts', async () => {
  const { getClient } = ctx
  const { posts }: any = await getClient().request(
    `#graphql
      query {
        posts {
          id
          published
        }
      }
    `,
  )

  expect(posts.length).toBe(2)
  expect(posts[0].published).toBe(true)
})

it('Should fetch users posts', async () => {
  const { getClient } = ctx
  const { myPosts }: any = await getClient(userOne.jwt).request(
    `#graphql
      query {
        myPosts {
          id
          published
        }
      }
    `,
  )

  expect(myPosts[0]).toMatchObject({
    id: expect.any(Number),
    published: true,
  })
})

it('Should be able to update own post', async () => {
  const { getClient, prisma } = ctx
  const variables = {
    data: {
      id: postOne.id,
      published: false,
    },
  }

  const { updatePost: postResponse }: any = await getClient(
    userOne.jwt,
  ).request(
    `#graphql
      mutation($data: UpdatePostInput!) {
        updatePost(data: $data) {
          id
          published
        }
      }
    `,
    variables,
  )

  expect(postResponse).toMatchObject({
    id: postOne.id,
    published: false,
  })

  const post = await prisma.post.findUnique({
    where: {
      id: postResponse.id,
    },
  })

  expect(post).toMatchObject({
    id: postOne.id,
    published: false,
  })
})

it('Should create a new post', async () => {
  const { getClient } = ctx
  const variables = {
    data: {
      title: 'A test post',
      body: '',
      published: true,
    },
  }

  const { createPost }: any = await getClient(userOne.jwt).request(
    `#graphql
      mutation($data: CreatePostInput!) {
        createPost(data: $data) {
          id
          title
          body
          published
        }
      }
    `,
    variables,
  )

  expect(createPost.title).toBe('A test post')
  expect(createPost.body).toBe('')
  expect(createPost.published).toBe(true)
})

it('Should delete post', async () => {
  const { getClient, prisma } = ctx
  const variables = {
    data: {
      id: postOne.id,
    },
  }

  const { deletePost }: any = await getClient(userOne.jwt).request(
    `#graphql
      mutation($data: DeletePostInput!) {
        deletePost(data: $data) {
          id
        }
      }
    `,
    variables,
  )

  expect(deletePost.id).toBe(postOne.id)

  const post = await prisma.post.findUnique({ where: { id: postOne.id } })
  expect(post).toBe(null)
})
