import { SurveyModel } from '@/domain/models/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurveyInterface {
  add: (addSurveyModel: AddSurveyParams) => Promise<void>
}
