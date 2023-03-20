import { AccountModel } from '@/application/usecases/user-control/add-account/add-account-protocols'

export interface LoadAccountByTokenInterface {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
