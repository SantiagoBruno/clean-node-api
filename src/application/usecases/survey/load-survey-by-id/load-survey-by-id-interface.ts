import { SurveyModel } from './load-survey-by-id-protocols'

export interface LoadSurveyByIdInterface {
  loadById: (id: string) => Promise<SurveyModel>
}
