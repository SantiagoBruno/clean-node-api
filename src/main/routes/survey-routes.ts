import { Router } from 'express'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { adptRoute } from '@/infra/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/addsurvey', adminAuth, adptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adptRoute(makeLoadSurveysController()))
}
