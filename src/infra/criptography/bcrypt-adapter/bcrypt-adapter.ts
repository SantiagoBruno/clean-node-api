import bcrypt from 'bcrypt'
import { HashCompare } from '../../../application/protocols/criptography/hash-compare'
import { Hasher } from '../../../application/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
