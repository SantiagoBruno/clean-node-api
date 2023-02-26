import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'

let surveyCollection: Collection

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
  })
})
