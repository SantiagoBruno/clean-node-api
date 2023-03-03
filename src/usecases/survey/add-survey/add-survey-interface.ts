export interface surveyAnswer {
  image?: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: surveyAnswer[]
  date: Date
}

export interface AddSurveyInterface {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
