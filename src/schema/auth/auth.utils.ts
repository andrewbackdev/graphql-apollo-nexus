import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const SaltRounds = 10
const jwtSecret = 'aisda'

interface JwtPayload {
  id: number
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, SaltRounds)
}

export function generateJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtSecret)
}

export function decodeJwtToken(token: string): JwtPayload {
  return jwt.verify(token, jwtSecret) as JwtPayload
}
