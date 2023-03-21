import { Decrypter } from '@/application/protocols/criptography/decrypter'
import { Encrypter } from '@/application/protocols/criptography/encrypter'
import { HashCompare } from '@/application/protocols/criptography/hash-compare'
import { Hasher } from '@/application/protocols/criptography/hasher'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  const hasherStub = new HasherStub()
  return hasherStub
}

export const mockDescrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise <string> {
      return await Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}

export const mockHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise <boolean> {
      return true
    }
  }
  return new HashCompareStub()
}
