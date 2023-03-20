import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { SaveSurveyResultRepository, SaveSurveyResultRepositoryParams, SurveyResultModel } from '@/application/usecases/survey-result/save-survey-result/save-survey-result-protocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultRepositoryParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId
      },
      {
        $set: {
          answer: data.answer,
          date: data.date
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    const surveyResult = MongoHelper.mapMongoDbObject(res.value)
    return surveyResult
  }
}
