import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveysInterface
} from './load-surveys-protocols'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveysInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch {
      return serverError(new Error())
    }
  }
}
