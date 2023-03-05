import { AddSurveyRepository } from './add-survey-protocols'
import { AddSurveyInterface, AddSurveyModel } from './add-survey-interface'

export class AddSurvey implements AddSurveyInterface {
  constructor (
    private readonly AddSurveyRepository: AddSurveyRepository
  ) {}

  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    await this.AddSurveyRepository.add(addSurveyModel)
    return null
  }
}
