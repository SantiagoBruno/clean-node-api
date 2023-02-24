import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByToken } from './load-account-by-token'

describe('LoadAccountByToken usecases', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('any_id'))
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new LoadAccountByToken(decrypterStub)
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
