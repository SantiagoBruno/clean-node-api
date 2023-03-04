import { SurveyModel } from './load-survey-protocols'

export interface LoadSurveysInterface {
  load: () => Promise<SurveyModel[] | []>
}
