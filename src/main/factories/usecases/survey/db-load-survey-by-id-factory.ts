
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveyById } from '@/application/survey/load-survey-by-id/load-survey-by-id'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const loadSurveyByIdRepository = new SurveyMongoRepository()
  return new LoadSurveyById(loadSurveyByIdRepository)
}
