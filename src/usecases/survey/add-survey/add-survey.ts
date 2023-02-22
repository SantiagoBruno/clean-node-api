import {
  AddSurvey,
  AddSurveyModel,
  AddSurveyRepository
} from './add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly AddSurveyRepository: AddSurveyRepository
  ) {}

  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    await this.AddSurveyRepository.add(addSurveyModel)
    return null
  }
}
