import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { AddSurveyRepository, AddSurveyRepositoryParams } from '@/application/protocols/repository/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/application/protocols/repository/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/application/usecases/survey/load-survey-by-id/load-survey-by-id-protocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements
  AddSurveyRepository,
  LoadSurveysRepository,
  LoadSurveyByIdRepository {
  async add (addSurveyModel: AddSurveyRepositoryParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(addSurveyModel)
  }

  async loadAll (): Promise<SurveyModel[] | []> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const mongoObjSurveys = await surveyCollection.find().toArray()
    const surveys: SurveyModel[] = MongoHelper.mapMongoDbArrObjects(mongoObjSurveys)
    return surveys
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const mongoObj = await surveyCollection.findOne({ _id: new ObjectId(id) })
    const survey = MongoHelper.mapMongoDbObject(mongoObj)
    return survey
  }
}
