import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { sign } from 'jsonwebtoken'
import { AddSurveyInterfaceParams } from '@/application/usecases/survey/add-survey/add-survey-interface'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeSurvey = (): AddSurveyInterfaceParams => ({
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

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: '123'
    })
    const objId = res.insertedId
    const accessToken = sign({ id: objId.toString() }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: objId
    }, {
      $set: {
        accessToken
      }
    })

    return accessToken
  }

  describe('put/surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answers: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with valid accessToken', async () => {
      const res = await surveyCollection.insertOne(makeFakeSurvey())
      const surveyId = res.insertedId.toString()
      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer_1'
        })
        .expect(200)
    })
  })
})
