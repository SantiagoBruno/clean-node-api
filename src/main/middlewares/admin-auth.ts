import { makeAuthMidleware } from '@/main/factories/middlewares/auth-middleware'
import { adptMiddleware } from '@/infra/express/express-middleware-adapter'

export const adminAuth = adptMiddleware(makeAuthMidleware('admin'))
