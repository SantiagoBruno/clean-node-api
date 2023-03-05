import { Router } from 'express'
import { adptMiddleware } from '../../infra/express/express-middleware-adapter'
import { adptRoute } from '../../infra/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { makeAuthMidleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/addsurvey', adptMiddleware(makeAuthMidleware('admin')), adptRoute(makeAddSurveyController()))
  router.get('/surveys', adptMiddleware(makeAuthMidleware()), adptRoute(makeLoadSurveysController()))
}
