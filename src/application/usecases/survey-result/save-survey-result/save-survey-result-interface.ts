import { SurveyResultModel } from './save-survey-result-protocols'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'> & { id?: string }

export interface SaveSurveyResultInterface {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
