import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { mockSurveyModel } from '@/domain/test/mock-survey'

let surveyCollection: Collection
let accountCollection: Collection

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
      const res = await surveyCollection.insertOne(mockSurveyModel())
      const surveyId = res.insertedId.toString()
      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer_01'
        })
        .expect(200)
    })
  })
})
