import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveysRepository } from '../../../../usecases/protocols/repository/survey/load-surveys-repository'
import { LoadSurveys } from '../../../../usecases/survey/load-surveys/load-surveys'

export const makeDbLoadSurvey = (): LoadSurveys => {
  const loadSurveysMongoRepository: LoadSurveysRepository = new SurveyMongoRepository()
  return new LoadSurveys(loadSurveysMongoRepository)
}
