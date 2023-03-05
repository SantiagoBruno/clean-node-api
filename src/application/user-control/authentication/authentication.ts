import {
  AccountModel,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  HashCompare,
  Encrypter
} from './authentication-protocols'
import {
  AuthenticationInterface,
  AuthenticationModel
} from './authentication-interface'

export class Authentication implements AuthenticationInterface {
  constructor (
    private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account: AccountModel = await this.loadAcountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password)
      if (isValid) {
        const accesToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accesToken)
        return accesToken
      }
    }
    return null
  }
}
