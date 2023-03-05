import { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

interface expressMiddlewareFunction {
  (req: Request, res: Response, next: NextFunction)
}

export const adptMiddleware = (middleware: Middleware): expressMiddlewareFunction => {
  return (
    async (req: Request, res: Response, next: NextFunction) => {
      const httpRequest: HttpRequest = {
        headers: req.headers
      }
      const httpResponse: HttpResponse = await middleware.handle(httpRequest)

      if (httpResponse.statusCode === 200) {
        await Object.assign(req, httpResponse.body)
        next()
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }
  )
}
