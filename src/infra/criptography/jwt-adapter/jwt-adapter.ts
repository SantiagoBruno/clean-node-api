import Jwt from 'jsonwebtoken'
import { Encrypter } from '@/application/protocols/criptography/encrypter'
import { Decrypter } from '@/application/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const jwtToken: string = await Jwt.sign({ id: value }, this.secret)
    return await Promise.resolve(jwtToken)
  }

  async decrypt (token: string): Promise<string> {
    const value: any = await Jwt.verify(token, this.secret)
    return value
  }
}
