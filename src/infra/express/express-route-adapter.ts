import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

interface expressControllerFunction {
  (req: Request, res: Response)
}

export const adptRoute = (controller: Controller): expressControllerFunction => {
  return (
    async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }
      const httpResponse: HttpResponse = await controller.handle(httpRequest)

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body.message)
      }
    }
  )
}
