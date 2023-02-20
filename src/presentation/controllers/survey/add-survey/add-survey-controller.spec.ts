import {
  HttpRequest,
  Validation
} from './add-survey-protocols'
import { AddSurveyController } from './add-surveu-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question?',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  const validationStub = new ValidationStub()
  return validationStub
}

describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const validationStub = makeValidation()
    const sut = new AddSurveyController(validationStub)
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
