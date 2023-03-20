import { AccountModel } from './add-account-protocols'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccountInteface {
  add: (addAccount: AddAccountParams) => Promise< AccountModel | null>
}
