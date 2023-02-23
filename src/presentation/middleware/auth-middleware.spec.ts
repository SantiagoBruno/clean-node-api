import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'
import { LoadAccountByTokenInterface } from '../../usecases/middleware/load-account-by-token-interface'
import { AccountModel } from '../../domain/models/account'
import { HttpRequest } from '../protocols'

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

const makeSut = (): SutTypes => {
  const loadAccountByTOkenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTOkenStub)
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

  test('Should call loadAccountByTOken with correct accessToken', async () => {
    const { sut, loadAccountByTOkenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTOkenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
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
    expect(httpResponse).toEqual(ok({ account_id: 'valid_id' }))
  })
})
