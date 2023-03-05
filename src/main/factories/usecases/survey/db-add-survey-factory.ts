import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { AddSurvey } from '../../../../application/survey/add-survey/add-survey'
import { AddSurveyRepository } from '../../../../application/survey/add-survey/add-survey-protocols'

export const makeDbAddSurvey = (): AddSurvey => {
  const addSurveyMongoRepository: AddSurveyRepository = new SurveyMongoRepository()
  return new AddSurvey(addSurveyMongoRepository)
}
