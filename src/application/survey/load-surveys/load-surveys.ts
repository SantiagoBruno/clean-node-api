import { LoadSurveysInterface } from './load-surveys-interface'
import { LoadSurveysRepository, SurveyModel } from './load-surveys-protocols'

export class LoadSurveys implements LoadSurveysInterface {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[] | []> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
