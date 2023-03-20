import { SurveyModel } from '@/domain/models/survey'

export type AddSurveyInterfaceParams = Omit<SurveyModel, 'id'>

export interface AddSurveyInterface {
  add: (addSurveyModel: AddSurveyInterfaceParams) => Promise<void>
}
