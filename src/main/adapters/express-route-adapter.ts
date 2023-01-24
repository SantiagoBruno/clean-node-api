import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adptRoute = (controller: Controller) => {
  return (req: Request, res: Response) => {
    void (async () => {
      const httpRequest: HttpRequest = {
        body: req.body
      }
      const httpResponse: HttpResponse = await controller.handle(httpRequest)
      if (httpResponse.statusCode === 200) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body.message)
      }
    })
  }
}
