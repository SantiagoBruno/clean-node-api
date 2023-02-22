import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../user-control/add-account/add-account-interface'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
