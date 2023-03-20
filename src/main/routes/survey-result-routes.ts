import { Router } from 'express'
import { auth } from '@/main/middlewares/auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { adptRoute } from '@/infra/express/express-route-adapter'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adptRoute(makeSaveSurveyResultController()))
}
