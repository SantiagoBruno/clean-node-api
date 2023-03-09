import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyByIdInterface {
  loadById: (id: string) => Promise<SurveyModel>
}
