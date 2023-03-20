import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '@/application/usecases/user-control/add-account/add-account'

export const makeAddAccount = (): AddAccount => {
  const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new AddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
