import { adptMiddleware } from '@/infra/express/express-middleware-adapter'
import { makeAuthMidleware } from '../factories/middlewares/auth-middleware'

export const adminAuth = adptMiddleware(makeAuthMidleware('admin'))
