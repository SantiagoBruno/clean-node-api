import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { LogErrorRepository } from '@/application/protocols/repository/log/log-error-repository'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
