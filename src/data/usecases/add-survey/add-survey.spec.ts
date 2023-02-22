import {
  AddSurveyModel,
  AddSurveyRepository
} from './add-survey-protocols'
import { DbAddSurvey } from './add-survey'

interface sutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): sutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('AddSurvey Usecase', () => {
  test('Should call repository AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
