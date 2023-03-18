import {
  Controller,
  forbidden,
  InvalidParamError,
  HttpRequest,
  HttpResponse,
  LoadSurveyByIdInterface,
  serverError
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyByIdInterface: LoadSurveyByIdInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyByIdInterface.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
