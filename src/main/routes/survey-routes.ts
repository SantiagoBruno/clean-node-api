import { Router } from 'express'
import { adptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey-controller'

export default (router: Router): void => {
  router.post('/addsurvey', adptRoute(makeAddSurveyController()))
}
