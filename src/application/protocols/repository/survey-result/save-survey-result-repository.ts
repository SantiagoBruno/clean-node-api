import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultRepositoryParams = Omit<SurveyResultModel, 'id'> & { id?: string }

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultRepositoryParams) => Promise<SurveyResultModel>
}
