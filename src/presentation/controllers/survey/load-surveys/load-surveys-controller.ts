import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveysInterface
} from './load-surveys-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveysInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch {
      return serverError(new Error())
    }
  }
}
