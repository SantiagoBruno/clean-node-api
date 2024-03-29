import request from 'supertest'
import bcrypt from 'bcrypt'
import { Collection } from 'mongodb'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
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
    test('Should return 200 on login', async () => {
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

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: 'valid_password'
        })
        .expect(401)
    })
  })
})
