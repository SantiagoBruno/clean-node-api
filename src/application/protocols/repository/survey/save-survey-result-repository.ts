import { SaveSurveyResultModel } from '@/application/survey/save-survey-result/save-survey-result-interface'
import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
