import { AddAccountRepository } from '../../../../usecases/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../usecases/protocols/repository/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../usecases/protocols/repository/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../usecases/user-control/add-account/add-account-interface'
import { MongoHelper } from '../helpers/mongo-helpers'
import { LoadAccountByTokenRepository } from '../../../../usecases/protocols/repository/account/load-account-by-token-repository'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const id = result.insertedId
    const account = await accountCollection.findOne({ _id: id })
    const mappedAccount = MongoHelper.mapAccount(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    const mappedAccount = MongoHelper.mapAccount(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken, role })
    const mappedAccount = MongoHelper.mapAccount(account)
    return await new Promise(resolve => resolve(mappedAccount))
  }
}
