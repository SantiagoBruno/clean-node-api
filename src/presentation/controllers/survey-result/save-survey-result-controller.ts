import {
  Controller,
  forbidden,
  InvalidParamError,
  HttpRequest,
  HttpResponse,
  LoadSurveyByIdInterface,
  serverError,
  SaveSurveyResultInterface,
  ok
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyByIdInterface: LoadSurveyByIdInterface,
    private readonly saveSurveyResult: SaveSurveyResultInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body, accountId } = httpRequest
      const { surveyId } = params
      const { answer } = body

      const survey = await this.loadSurveyByIdInterface.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(answer => answer.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
