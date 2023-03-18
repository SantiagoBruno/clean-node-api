import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import {
  HttpRequest,
  LoadAccountByTokenInterface,
  AccountModel
} from './auth-middleware-protocols'
import { AuthMiddleware } from './auth-middleware'

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTOkenStub: LoadAccountByTokenInterface
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: { 'x-access-token': 'any_token' }
})

const makeLoadAccountByTokenStub = (): LoadAccountByTokenInterface => {
  class LoadAccountByTokenStub implements LoadAccountByTokenInterface {
    async load (accessToken): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTOkenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTOkenStub, role)
  return {
    sut,
    loadAccountByTOkenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token existsin headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call loadAccountByTOken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTOkenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTOkenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if loadAccountByTOken returns null', async () => {
    const { sut, loadAccountByTOkenStub } = makeSut()
    jest.spyOn(loadAccountByTOkenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if loadAccountByTOken returns ac account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if loadAccountByTOken throws', async () => {
    const { sut, loadAccountByTOkenStub } = makeSut()
    jest.spyOn(loadAccountByTOkenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
