import { Router } from 'express'
import { makeSignUpController } from '@/main/factories/controllers/user-control/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/user-control/login/login-controller-factory'
import { adptRoute } from '@/infra/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adptRoute(makeSignUpController()))
  router.post('/login', adptRoute(makeLoginController()))
}
