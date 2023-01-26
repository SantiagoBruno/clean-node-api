import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adptRoute = (controller: Controller) => {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    controller.handle(httpRequest).then((httpResponse: HttpResponse) => {
      if (httpResponse.statusCode === 200) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body.message)
      }
    }).catch((error) => { throw error })
  }
}
