import {
  AccountModel,
  Authentication,
  AuthenticationModel,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  HashCompare,
  TokenGenerator
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompare: HashCompare
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAcountByEmailRepository: LoadAccountByEmailRepository,
    hashCompare: HashCompare,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAcountByEmailRepository = loadAcountByEmailRepository
    this.hashCompare = hashCompare
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account: AccountModel = await this.loadAcountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password)
      if (isValid) {
        const accesToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accesToken)
        return accesToken
      }
    }
    return null
  }
}
