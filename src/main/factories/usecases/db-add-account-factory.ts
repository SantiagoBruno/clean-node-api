import { DbAddAccount } from '../../../usecases/usecases/add-account/add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '../../../domain/usecases/add-account'

export const makeAddAccount = (): AddAccount => {
  const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
