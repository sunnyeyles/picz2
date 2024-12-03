import { Response } from 'express'
import { User } from '../models/models'
import { CreateUserRequest as CreateUserRequestType } from '../types/userTypes'

export const createNewUser = async (
  req: CreateUserRequestType,
  res: Response
) => {
  try {
    console.log('Webhook received:', req.body)

    const { id, first_name, last_name, email_addresses } = req.body.data

    const email = email_addresses[0]?.email_address || ''

    const imageUrls = [{}]

    const newUser = {
      _idClerk: id,
      email,
      fName: first_name,
      lName: last_name,
      imageUrls,
    }

    await User.create(newUser)

    res.status(200).send({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('error creating user:', error)
    res.status(500).send({ message: 'internal server error' })
  }
}
