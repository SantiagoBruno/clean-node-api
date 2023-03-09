import { SaveSurveyResultModel, SaveSurveyResultInterface } from './save-survey-result-interface'
import { SaveSurveyResultRepository, SurveyResultModel } from './save-survey-result-protocols'

export class SaveSurveyResult implements SaveSurveyResultInterface {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
