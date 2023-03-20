import { AddAccountInteface, AddAccountParams } from '@/application/usecases/user-control/add-account/add-account-interface'
import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const MockAddAccount = (): AddAccountInteface => {
  class AddAccountStub implements AddAccountInteface {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  const addAccountStub = new AddAccountStub()
  return addAccountStub
}
