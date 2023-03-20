import { LoadSurveyByIdInterface } from './load-survey-by-id-interface'
import { LoadSurveyByIdRepository, SurveyModel } from './load-survey-by-id-protocols'

export class LoadSurveyById implements LoadSurveyByIdInterface {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
