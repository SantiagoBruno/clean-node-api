import { AccountModel } from '@/application/usecases/user-control/add-account/add-account-protocols'
import { Decrypter } from '@/application/protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '@/application/protocols/repository/account/load-account-by-token-repository'

import { LoadAccountByTokenInterface } from './load-account-by-token-interface'

export class LoadAccountByToken implements LoadAccountByTokenInterface {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
