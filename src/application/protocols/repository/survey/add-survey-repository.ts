import { AddSurveyModel } from '../../../survey/add-survey/add-survey-interface'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
