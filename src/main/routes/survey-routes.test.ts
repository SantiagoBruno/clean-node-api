import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import { sign } from 'jsonwebtoken'

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

    test('Should return 200 on load surveys with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: '123'
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
      await surveyCollection.insertMany([
        {
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
        }
      ])
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
