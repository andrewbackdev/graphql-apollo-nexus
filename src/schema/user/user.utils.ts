import { decodeJwtToken } from '../auth/auth.utils'
import { Context } from '../../context'
import { User } from '@prisma/client'

export async function getUser(
  context: Context,
  isAuthRequired: boolean = true,
): Promise<User | null> {
  const { prisma, request } = context
  const token = request.req.headers?.authorization

  if (!token) {
    if (isAuthRequired) {
      throw new Error('Auth required')
    }

    return null
  }

  let user = null
  try {
    const jwtToken = token.split('Bearer ')[1]
    user = decodeJwtToken(jwtToken)
  } catch {
    throw new Error('Token is invalid')
  }

  return prisma.user.findUnique({ where: { id: user.id } })
}
