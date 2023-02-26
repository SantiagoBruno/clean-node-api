import { AuthMiddleware } from '../../../presentation/middleware/auth-middleware'
import { Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/user-control/db-load-account-by-token-factory'

export const makeAuthMidleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
