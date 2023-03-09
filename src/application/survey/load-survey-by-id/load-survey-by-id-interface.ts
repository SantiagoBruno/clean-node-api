import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  LoadById: (id: string) => Promise<SurveyModel>
}
