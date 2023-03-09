import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/application/user-control/add-account/add-account-interface'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
