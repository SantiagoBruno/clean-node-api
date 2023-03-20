import { AddSurveyRepository } from './add-survey-protocols'
import { AddSurveyInterface, AddSurveyInterfaceParams } from './add-survey-interface'

export class AddSurvey implements AddSurveyInterface {
  constructor (
    private readonly AddSurveyRepository: AddSurveyRepository
  ) {}

  async add (addSurveyInterfaceParams: AddSurveyInterfaceParams): Promise<void> {
    await this.AddSurveyRepository.add(addSurveyInterfaceParams)
    return null
  }
}
