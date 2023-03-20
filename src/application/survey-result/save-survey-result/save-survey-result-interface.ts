import { SurveyResultModel } from './save-survey-result-protocols'

export type SaveSurveyResultInterfaceParams = Omit<SurveyResultModel, 'id'> & { id?: string }

export interface SaveSurveyResultInterface {
  save: (data: SaveSurveyResultInterfaceParams) => Promise<SurveyResultModel>
}
