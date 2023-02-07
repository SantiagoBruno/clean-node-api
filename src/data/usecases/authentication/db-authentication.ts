import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository

  constructor (loadAcountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAcountByEmailRepository = loadAcountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email } = authentication
    this.loadAcountByEmailRepository.load(email)
    return await new Promise(resolve => resolve(email))
  }
}
