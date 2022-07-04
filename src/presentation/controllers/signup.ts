import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const body = httpRequest.body
    if (!body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 400,
      body: {}
    }
  }
}
