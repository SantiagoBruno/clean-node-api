import env from '../../../config/env'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { LoadAccountByTokenInterface } from '../../../../application/user-control/load-account-by-token/load-account-by-token-interface'
import { LoadAccountByToken } from '../../../../application/user-control/load-account-by-token/load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByTokenInterface => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new LoadAccountByToken(jwtAdapter, accountMongoRepository)
}
