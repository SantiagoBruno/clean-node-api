import { Router } from 'express'
import { adptRoute } from '@/infra/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/user-control/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/user-control/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adptRoute(makeSignUpController()))
  router.post('/login', adptRoute(makeLoginController()))
}
