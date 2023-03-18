import {
  Controller,
  forbidden,
  HttpRequest,
  HttpResponse,
  LoadSurveyByIdInterface
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyByIdInterface: LoadSurveyByIdInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    const survey = await this.loadSurveyByIdInterface.loadById(surveyId)
    if (!survey) {
      return forbidden(new Error())
    }
    return null
  }
}
