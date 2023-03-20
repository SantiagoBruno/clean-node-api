import { AccountModel, LoadAccountByTokenInterface } from '@/presentation/middleware/auth-middleware-protocols'
import { mockAccountModel } from '@/domain/test'

export const mockLoadAccountByToken = (): LoadAccountByTokenInterface => {
  class LoadAccountByTokenStub implements LoadAccountByTokenInterface {
    async load (accessToken): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}
