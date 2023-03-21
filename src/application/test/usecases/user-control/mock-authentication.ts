import { AuthenticationInterface, AuthenticationParams } from '@/application/usecases/user-control/authentication/authentication-interface'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockAuthentication = (): AuthenticationInterface => {
  class AuthenticationStub implements AuthenticationInterface {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  const authenticationStub = new AuthenticationStub()
  return authenticationStub
}
