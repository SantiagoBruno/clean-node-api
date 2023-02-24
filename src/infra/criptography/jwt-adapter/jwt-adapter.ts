import Jwt from 'jsonwebtoken'
import { Encrypter } from '../../../usecases/protocols/criptography/encrypter'
import { Decrypter } from '../../../usecases/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const jwtToken: string = await Jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => resolve(jwtToken))
  }

  async decrypt (token: string): Promise<string> {
    Jwt.verify(token, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
