export class CustomError extends Error {
  status: number
  message: string

  constructor(status: number, message?: string) {
    super(message)

    this.status = status
    this.message = message || ''

    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    if (process.env.ENVIRONMENT !== 'production') {
      console.error(message)
    }
  }
}
