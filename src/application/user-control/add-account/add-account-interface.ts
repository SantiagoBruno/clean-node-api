import { AccountModel } from './add-account-protocols'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccountInteface {
  add: (addAccount: AddAccountModel) => Promise< AccountModel | null>
}
