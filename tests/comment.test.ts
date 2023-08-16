import { createTestContext } from './__helpers'
import { userOne, commentOne, commentTwo } from './seed-database'

const ctx = createTestContext()

it('Should delete own comment', async () => {
  const { getClient, prisma } = ctx
  const variables = {
    data: {
      id: commentOne.id,
    },
  }

  const { deleteComment }: any = await getClient(userOne.jwt).request(
    `#graphql
      mutation($data: DeleteCommentInput!) {
        deleteComment(data: $data) {
          id
          text
        }
      }
    `,
    variables,
  )

  expect(deleteComment).toMatchObject({
    id: commentOne.id,
    text: commentOne.text,
  })

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentOne.id,
    },
  })

  expect(comment).toBe(null)
})

it('Should not delete other users comment', async () => {
  const { getClient, prisma } = ctx
  const variables = {
    data: {
      id: commentTwo.id,
    },
  }

  await expect(
    getClient(userOne.jwt).request(
      `#graphql
        mutation($data: DeleteCommentInput!) {
          deleteComment(data: $data) {
            id
            text
          }
        }
      `,
      variables,
    ),
  ).rejects.toThrow()

  const comment = await prisma.comment.findUnique({
    where: { id: commentTwo.id },
  })

  expect(comment).toBeTruthy()
})
