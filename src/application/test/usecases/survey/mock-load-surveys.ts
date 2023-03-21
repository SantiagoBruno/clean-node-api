import { LoadSurveysInterface } from '@/application/usecases/survey/load-surveys/load-surveys-interface'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModelArray } from '@/domain/test'

export const mockLoadSurveys = (): LoadSurveysInterface => {
  class LoadSurveysStub implements LoadSurveysInterface {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModelArray())
    }
  }
  return new LoadSurveysStub()
}
