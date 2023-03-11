import { SaveSurveyResultModel } from '@/application/survey/save-survey-result/save-survey-result-interface'
import { SaveSurveyResultRepository, SurveyResultModel } from '@/application/survey/save-survey-result/save-survey-result-protocols'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
