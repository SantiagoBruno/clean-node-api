import {
  AddSurveyInterface,
  AddSurveyParams
} from '@/application/usecases/survey/add-survey/add-survey-interface'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image_01',
      answer: 'any_answer_01'
    },
    {
      answer: 'any_answer_02'
    }
  ],
  date: new Date()
})

export const mockAddSurvey = (): AddSurveyInterface => {
  class AddSurveyStub implements AddSurveyInterface {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}
