import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import bcrypt from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST/signup', () => {
    test('Should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password'
        })
        .expect(200)
    })
  })

  describe('POST/login', () => {
    test('Should return 200 on login success', async () => {
      const password = await bcrypt.hash('valid_password', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: 'valid_password'
        })
        .expect(200)
    })
  })
})
