import {
  LoadSurveyByIdInterface,
  SurveyModel
} from '@/presentation/controllers/survey-result/save-survey-result-protocols'
import { mockSurveyModel } from '@/domain/test'

export const mockLoadSurveyById = (): LoadSurveyByIdInterface => {
  class LoadSurveyByIdStub implements LoadSurveyByIdInterface {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdStub()
}
