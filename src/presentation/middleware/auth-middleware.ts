import { LoadAccountByTokenInterface } from '../../usecases/middleware/load-account-by-token-interface'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByTokenInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }

    const error = forbidden(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
