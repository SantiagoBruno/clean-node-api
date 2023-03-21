import {
  SaveSurveyResultInterface,
  SaveSurveyResultParams
} from '@/application/usecases/survey-result/save-survey-result/save-survey-result-interface'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSaveSurveyResult = (): SaveSurveyResultInterface => {
  class SaveSurveyResultStub implements SaveSurveyResultInterface {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultStub()
}
