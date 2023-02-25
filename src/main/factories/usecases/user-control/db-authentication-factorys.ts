import env from '../../../config/env'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../usecases/user-control/authentication/authentication'
import { AuthenticationInterface } from '../../../../usecases/user-control/authentication/authentication-interface'

export const makeDbAuthentication = (): AuthenticationInterface => {
  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter: BcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new Authentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository)
}
