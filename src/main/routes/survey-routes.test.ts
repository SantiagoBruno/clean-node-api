import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'

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
      password: '123',
      role: 'admin'
    })
    const id = res.insertedId
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })

    return accessToken
  }

  describe('POST/addsurvey', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/addsurvey')
        .send({
          question: 'valid_question',
          answers: [
            {
              answer: 'any_answer_1'
            },
            {
              image: 'any_image_2',
              answer: 'any_answer_2'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/addsurvey')
        .set('x-access-token', accessToken)
        .send({
          question: 'valid_question',
          answers: [
            {
              answer: 'any_answer_1'
            },
            {
              image: 'any_image_2',
              answer: 'any_answer_2'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET/surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
