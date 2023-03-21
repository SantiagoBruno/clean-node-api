import httpMocks from 'node-mocks-http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { adptRoute } from './express-route-adapter'

const mockRequest = httpMocks.createRequest({
  body: {
    param: 'any_body_param'
  },
  params: {
    param: 'any_params_param'
  },
  accountId: 'any_account_id'
})

const mockResponse = httpMocks.createResponse()

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: httpRequest.body
      })
    }
  }
  return new ControllerStub()
}

describe('adptRoute', () => {
  test('Should call handle method from controller with correct values', async () => {
    const controller = makeControllerStub()
    const sut = adptRoute(controller)
    const spyHandle = jest.spyOn(controller, 'handle')
    await sut(mockRequest, mockResponse)
    expect(spyHandle).toHaveBeenCalledWith({
      body: mockRequest.body,
      params: mockRequest.params,
      accountId: mockRequest.accountId
    })
  })

  test('Should return httpResponse with status code between 200 and 299 and body on success', async () => {
    const controller = makeControllerStub()
    const sut = adptRoute(controller)
    const responseStub = mockResponse
    await sut(mockRequest, responseStub)
    expect(mockResponse.statusCode).toBe(200)
  })

  test('Should return httpResponse with error status code and error message on error', async () => {
    const controller = makeControllerStub()
    const sut = adptRoute(controller)
    jest.spyOn(controller, 'handle').mockReturnValueOnce(Promise.resolve({
      statusCode: 500,
      body: {
        param: 'any_param',
        message: 'any_error'
      }
    }))
    await sut(mockRequest, mockResponse)
    expect(mockResponse.statusCode).toBe(500)
  })

  test('Should throw if handle throws', async () => {
    const controller = makeControllerStub()
    const sut = adptRoute(controller)
    jest.spyOn(controller, 'handle').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut(mockRequest, mockResponse)
    await expect(promise).rejects.toThrow()
  })
})
