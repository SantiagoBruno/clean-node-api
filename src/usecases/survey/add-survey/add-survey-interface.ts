export interface surveyAnswer {
  image: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: surveyAnswer[]
}

export interface AddSurveyInterface {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
