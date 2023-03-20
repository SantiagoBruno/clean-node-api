import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { AddAccountRepository, AddAccountRepositoryParams } from '@/application/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/application/protocols/repository/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/application/protocols/repository/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/application/protocols/repository/account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  async add (accountData: AddAccountRepositoryParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const id = result.insertedId
    const account = await accountCollection.findOne({ _id: id })
    const mappedAccount = MongoHelper.mapMongoDbObject(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    const mappedAccount = MongoHelper.mapMongoDbObject(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    const mappedAccount = MongoHelper.mapMongoDbObject(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }
}
