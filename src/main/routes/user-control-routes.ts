import { Router } from 'express'
import { adptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adptRoute(makeSignUpController()))
  router.post('/login', adptRoute(makeLoginController()))
}
