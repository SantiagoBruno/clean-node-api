import { LoadAccountByTokenInterface } from './load-account-by-token-interface'
import { AccountModel } from '../add-account/add-account-protocols'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/repository/account/load-account-by-token-repository'

export class LoadAccountByToken implements LoadAccountByTokenInterface {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return null
  }
}
