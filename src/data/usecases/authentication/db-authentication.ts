import { LoadAcountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository

  constructor (loadAcountByEmailRepository: LoadAcountByEmailRepository) {
    this.loadAcountByEmailRepository = loadAcountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email } = authentication
    this.loadAcountByEmailRepository.load(email)
    return await new Promise(resolve => resolve(email))
  }
}
