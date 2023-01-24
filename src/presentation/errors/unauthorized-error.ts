export class UnauthorizedError extends Error {
  constructor (stack: string = null) {
    super('Unauthorized')
    this.name = 'ServerError'
    this.stack = stack
  }
}
