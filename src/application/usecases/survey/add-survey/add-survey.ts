import { AddSurveyRepository } from './add-survey-protocols'
import { AddSurveyInterface, AddSurveyParams } from './add-survey-interface'

export class AddSurvey implements AddSurveyInterface {
  constructor (
    private readonly AddSurveyRepository: AddSurveyRepository
  ) {}

  async add (addSurveyParams: AddSurveyParams): Promise<void> {
    await this.AddSurveyRepository.add(addSurveyParams)
    return null
  }
}
