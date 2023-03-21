import {
  AccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './add-account-protocols'
import { AddAccountInteface, AddAccountParams } from './add-account-interface'

export class AddAccount implements AddAccountInteface {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel | null> {
    const accountLoaded = await this.loadAcountByEmailRepository.loadByEmail(accountData.email)
    if (!accountLoaded) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const account = { ...accountData, password: hashedPassword }
      const accountReturned = this.addAccountRepository.add(account)
      return await Promise.resolve(accountReturned)
    } else {
      return null
    }
  }
}
