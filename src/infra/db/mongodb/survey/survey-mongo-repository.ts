import { AddSurveyRepository } from '../../../../usecases/protocols/repository/survey/add-survey-repository'
import { AddSurveyModel } from '../../../../usecases/survey/add-survey/add-survey-interface'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(addSurveyModel)
  }
}
