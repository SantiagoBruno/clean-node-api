import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { SurveyModel } from '@/domain/models/survey'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  const sut = new SurveyResultMongoRepository()
  return sut
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1'
      },
      {
        answer: 'any_answer_2'
      }
    ],
    date: new Date()
  })
  const objId = res.insertedId
  const mongoObjSurvey = await surveyCollection.findOne({ _id: objId })
  const survey = MongoHelper.mapMongoDbObject(mongoObjSurvey)
  return survey
}

const makeAccount = async (): Promise<SurveyModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_hashed_password'
  })
  const objId = res.insertedId
  const mongoObjSurvey = await accountCollection.findOne({ _id: objId })
  const account = MongoHelper.mapMongoDbObject(mongoObjSurvey)
  return account
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  describe('save', () => {
    test('Should add a survey result if it is new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toEqual(survey.answers[0].answer)
    })

    test('Should update a survey result if it is not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()

      const surveyResultInsert = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResultUpdate = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      expect(surveyResultUpdate).toBeTruthy()
      expect(surveyResultUpdate.id).toEqual(surveyResultInsert.id)
      expect(surveyResultUpdate.answer).toEqual(survey.answers[1].answer)
    })
  })
})
