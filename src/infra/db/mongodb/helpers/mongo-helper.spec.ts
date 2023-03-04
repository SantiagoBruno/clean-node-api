import { MongoHelper as sut } from './mongo-helpers'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL || '')
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
  test('Should convert the account recieved from mongo to the correct format', () => {
    const account = {
      _id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    const mappedAccount = sut.mapMongoDbObject(account)
    expect(mappedAccount).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
})
