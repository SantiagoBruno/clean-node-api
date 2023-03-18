import { SaveSurveyResultController } from './save-survey-result-controller'
import {
  HttpRequest,
  forbidden,
  InvalidParamError,
  LoadSurveyByIdInterface,
  SurveyModel
} from './save-survey-result-protocols'

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyByIdInterface
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer_1'
    },
    {
      answer: 'any_answer_2'
    }
  ],
  date: new Date()
})

const makeLoadSurveyByIdStub = (): LoadSurveyByIdInterface => {
  class LoadSurveyByIdStub implements LoadSurveyByIdInterface {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult controller', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenLastCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(() => null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
