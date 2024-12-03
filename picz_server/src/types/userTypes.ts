import { Request, Response } from 'express'
export type CreateUserRequestBody = {
  data: {
    id: string
    email_addresses: {
      email_address: string
    }[]
    first_name: string
    last_name: string
  }
}

export type CreateUserRequest = Request<{}, {}, CreateUserRequestBody>
