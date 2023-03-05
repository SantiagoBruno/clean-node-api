import { AddAccount } from '../../../../application/user-control/add-account/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAddAccount = (): AddAccount => {
  const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new AddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
