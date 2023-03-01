import { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adptMiddleware = (middleware: Middleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    middleware.handle(httpRequest)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.statusCode === 200) {
          Object.assign(req, httpResponse.body)
          next()
        } else {
          res.status(httpResponse.statusCode).json({
            error: httpResponse.body.message
          })
        }
      })
      .catch((error) => {
        throw error
      })
  }
}
