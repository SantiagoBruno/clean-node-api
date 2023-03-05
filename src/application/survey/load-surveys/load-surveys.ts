import { LoadSurveysInterface } from './load-surveys-interface'
import { SurveyModel } from './load-surveys-protocols'
import { LoadSurveysRepository } from '../../protocols/repository/survey/load-surveys-repository'

export class LoadSurveys implements LoadSurveysInterface {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[] | []> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
