import { Request, Response } from 'express'
import { User } from '../models/models'

export type CreateUserRequestBody = {
  _idClerk: string
  email: string
  fName: string
  lName: string
  imageUrls: string[]
}

export type CreateUserRequest = Request<{}, {}, CreateUserRequestBody>

export const createUser = async (req: CreateUserRequest, res: Response) => {
  const { _idClerk, email, fName, lName, imageUrls } = req.body

  try {
    const newUser = await User.create({
      _idClerk,
      email,
      fName,
      lName,
      imageUrls,
    })

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
}
