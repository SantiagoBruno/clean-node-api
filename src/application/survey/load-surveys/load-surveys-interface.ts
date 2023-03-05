import { SurveyModel } from './load-surveys-protocols'

export interface LoadSurveysInterface {
  load: () => Promise<SurveyModel[] | []>
}
