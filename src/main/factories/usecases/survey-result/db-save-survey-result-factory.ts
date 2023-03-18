import { SaveSurveyResult } from '@/application/survey-result/save-survey-result/save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const saveSurveyResultRepository = new SurveyResultMongoRepository()
  return new SaveSurveyResult(saveSurveyResultRepository)
}
