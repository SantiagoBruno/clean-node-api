export interface surveyAnswer {
  image: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: surveyAnswer[]
}

export interface AddSurvey {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
