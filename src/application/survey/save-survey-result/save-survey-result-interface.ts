import { SurveyResultModel } from '../../../domain/models/survey -result'

export type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: AddSurveyResultModel) => Promise<SurveyResultModel>
}
