import {
  AccountModel,
  AddAccount,
  AddAccountModel, Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountLoaded = await this.loadAcountByEmailRepository.loadByEmail(accountData.email)
    if (!accountLoaded) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const account = { ...accountData, password: hashedPassword }
      const accountReturned = this.addAccountRepository.add(account)
      return await new Promise(resolve => resolve(accountReturned))
    } else {
      return null
    }
  }
}
