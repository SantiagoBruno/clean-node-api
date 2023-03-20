import { makeDbLoadAccountByToken } from '@/main/factories/usecases/user-control/db-load-account-by-token-factory'
import { AuthMiddleware } from '@/presentation/middleware/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMidleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
