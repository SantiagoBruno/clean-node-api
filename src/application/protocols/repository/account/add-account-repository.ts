import { AccountModel } from '@/domain/models/account'

export type AddAccountRepositoryParams = Omit<AccountModel, 'id'>

export interface AddAccountRepository {
  add: (accountData: AddAccountRepositoryParams) => Promise<AccountModel>
}
