import { LoadAccountByTokenInterface } from './load-account-by-token-interface'
import { AccountModel } from '../add-account/add-account-protocols'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class LoadAccountByToken implements LoadAccountByTokenInterface {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
