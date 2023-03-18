import { Router } from 'express'
import { adptRoute } from '@/infra/express/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', adminAuth, adptRoute(makeSaveSurveyResultController()))
}
