import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = ():SignUpController => {
    const emailValidatorAdapter: EmailValidatorAdapter = new EmailValidatorAdapter()
    const salt = 12
    const bcryptAdapter: BcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
    const dbAddAccount: DbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    return new SignUpController(emailValidatorAdapter, dbAddAccount)
}