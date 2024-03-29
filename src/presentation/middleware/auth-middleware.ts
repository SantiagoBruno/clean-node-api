import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import {
  Middleware,
  HttpRequest,
  HttpResponse,
  LoadAccountByTokenInterface
} from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByTokenInterface,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
