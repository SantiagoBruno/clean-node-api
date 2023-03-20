import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SaveSurveyResult } from '@/application/usecases/survey-result/save-survey-result/save-survey-result'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const saveSurveyResultRepository = new SurveyResultMongoRepository()
  return new SaveSurveyResult(saveSurveyResultRepository)
}
