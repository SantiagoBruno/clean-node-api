import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  mapAccount (account: any): AccountModel {
    return {
      id: account._id.toHexString(),
      name: account?.name,
      email: account?.email,
      password: account?.password
    }
  }
}
