import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByToken } from './load-account-by-token'

interface SutTypes {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
}

const makeDescrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_id'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDescrypterStub()
  const sut = new LoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('LoadAccountByToken usecases', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if  Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
