import { AddSurveyModel } from '@/application/survey/add-survey/add-survey-interface'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
