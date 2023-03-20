import { SaveSurveyResultInterfaceParams, SaveSurveyResultInterface } from './save-survey-result-interface'
import { SaveSurveyResultRepository, SurveyResultModel } from './save-survey-result-protocols'

export class SaveSurveyResult implements SaveSurveyResultInterface {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultInterfaceParams): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
