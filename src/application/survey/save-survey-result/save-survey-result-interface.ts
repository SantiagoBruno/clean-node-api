import { SurveyResultModel } from './save-survey-result-protocols'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'> & { id?: string }

export interface SaveSurveyResultInterface {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
