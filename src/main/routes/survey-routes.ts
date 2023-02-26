import { Router } from 'express'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey-controller'
import { makeAuthMidleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  router.post(
    '/addsurvey',
    adptMiddleware(makeAuthMidleware('admin')),
    adptRoute(makeAddSurveyController())
  )
}
