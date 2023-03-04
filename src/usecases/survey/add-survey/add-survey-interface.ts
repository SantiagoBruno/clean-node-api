import { SurveyAnswerModel } from '../../../domain/models/survey'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface AddSurveyInterface {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
