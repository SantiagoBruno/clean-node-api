import httpMocks from 'node-mocks-http'
import { Middleware, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { adptMiddleware } from './express-middleware-adapter'

const mockRequest = httpMocks.createRequest({
  headers: {
    param: 'any_param'
  }
})

const mockResponse = httpMocks.createResponse()

const mockNextFunction = (): any => {}

const makeMiddlewareStub = (): Middleware => {
  class MiddlewareStub implements Middleware {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => resolve({
        statusCode: 200,
        body: {
          accountId: 'any_id'
        }
      }))
    }
  }
  return new MiddlewareStub()
}

describe('adptRoute', () => {
  test('Should call handle method from controller with correct values', async () => {
    const middleware = makeMiddlewareStub()
    const sut = adptMiddleware(middleware)
    const spyHandle = jest.spyOn(middleware, 'handle')
    await sut(mockRequest, mockResponse, mockNextFunction)
    expect(spyHandle).toHaveBeenCalledWith({ headers: mockRequest.headers })
  })

  test('Should return httpRequest with correct statusCode, id and need to call next function', async () => {
    const middleware = makeMiddlewareStub()
    const sut = adptMiddleware(middleware)
    const spyNext = jest.fn(mockNextFunction)
    await sut(mockRequest, mockResponse, spyNext)
    expect(mockResponse.statusCode).toBe(200)
    expect(mockRequest.accountId).toEqual('any_id')
    expect(spyNext).toHaveBeenCalled()
  })

  test('Should return httpResponse with error status code', async () => {
    const middleware = makeMiddlewareStub()
    const sut = adptMiddleware(middleware)
    jest.spyOn(middleware, 'handle').mockReturnValueOnce(new Promise(resolve => resolve({
      statusCode: 500,
      body: {
        param: 'any_param',
        message: 'any_error'
      }
    })))
    await sut(mockRequest, mockResponse, mockNextFunction)
    expect(mockResponse.statusCode).toBe(500)
  })

  test('Should throw if handle throws', async () => {
    const middleware = makeMiddlewareStub()
    const sut = adptMiddleware(middleware)
    jest.spyOn(middleware, 'handle').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut(mockRequest, mockResponse, mockNextFunction)
    await expect(promise).rejects.toThrow()
  })
})
