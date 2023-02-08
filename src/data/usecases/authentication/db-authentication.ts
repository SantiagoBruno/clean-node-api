import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository
  private readonly hashCompare

  constructor (loadAcountByEmailRepository: LoadAccountByEmailRepository, hashCompare: HashCompare) {
    this.loadAcountByEmailRepository = loadAcountByEmailRepository
    this.hashCompare = hashCompare
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account: AccountModel = await this.loadAcountByEmailRepository.load(authentication.email)
    if (account) {
      this.hashCompare.compare(authentication.password, account.password)
    }
    return null
  }
}
