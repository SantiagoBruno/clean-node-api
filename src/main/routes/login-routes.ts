import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adptRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adptRoute(makeSignUpController()))
}
