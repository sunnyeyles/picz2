import { Request, Response } from 'express'

export const createNewUser = (req: Request, res: Response) => {
  console.log('Webhook received:', req.body)

  res.status(200).send({ message: 'Webhook processed successfully' })
}
