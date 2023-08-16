import { PrismaClient } from '@prisma/client'

export interface Request {
  req: {
    headers?: {
      authorization?: string
    }
  }
  res: any
}

export interface Context {
  prisma: PrismaClient
  request: Request
}

const prisma = new PrismaClient()

export const createContext = (request: any) => {
  return {
    prisma,
    request,
  }
}
