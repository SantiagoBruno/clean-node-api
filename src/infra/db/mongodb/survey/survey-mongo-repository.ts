import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyRepository } from '../../../../usecases/protocols/repository/survey/add-survey-repository'
import { LoadSurveysRepository } from '../../../../usecases/protocols/repository/survey/load-surveys-repository'
import { AddSurveyModel } from '../../../../usecases/survey/add-survey/add-survey-interface'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyMongoRepository implements
  AddSurveyRepository,
  LoadSurveysRepository {
  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(addSurveyModel)
  }

  async loadAll (): Promise<SurveyModel[] | []> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const mongoObjSurveys = await surveyCollection.find().toArray()
    const surveys: SurveyModel[] = MongoHelper.mapMongoDbArrObjects(mongoObjSurveys)
    return surveys
  }
}
