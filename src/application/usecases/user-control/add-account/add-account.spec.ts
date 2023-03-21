import {
  mockAddAccountRepository,
  mockLoadAccountByEmailRepository,
  mockAddAccountParams,
  mockHasher
} from '@/application/test'
import { mockAccountModel } from '@/domain/test'
import { AddAccount } from './add-account'
import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './add-account-protocols'

interface SutTypes {
  sut: AddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAcountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAcountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAcountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
  const sut = new AddAccount(hasherStub, addAccountRepositoryStub, loadAcountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAcountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementation(async () => {
      throw new Error()
    })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct velues', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementation(async () => {
      throw new Error()
    })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountReturned = await sut.add(mockAddAccountParams())
    expect(accountReturned).toEqual(mockAccountModel())
  })

  test('Should call loadAcountByEmailRepository with correct email', async () => {
    const { sut, loadAcountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAcountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return  null if loadAcountByEmailRepositoryStub not return null', async () => {
    const { sut, loadAcountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAcountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const accountReturned = await sut.add(mockAddAccountParams())
    expect(accountReturned).toBeNull()
  })
})
