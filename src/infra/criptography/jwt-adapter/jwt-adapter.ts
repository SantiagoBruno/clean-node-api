import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const jwtToken: string = await Jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => resolve(jwtToken))
  }
}
