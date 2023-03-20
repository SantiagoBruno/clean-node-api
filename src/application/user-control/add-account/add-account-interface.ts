import { AccountModel } from './add-account-protocols'

export type AddAccountInterfaceParams = Omit<AccountModel, 'id'>

export interface AddAccountInteface {
  add: (addAccount: AddAccountInterfaceParams) => Promise< AccountModel | null>
}
