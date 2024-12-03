import { Router } from 'express'
import { createNewUser } from '../handlers/clerkWebhook'
import { createUser } from '../handlers/createUser'

const userRouter = Router()

userRouter.post('/webhooks/clerk/', createNewUser)
userRouter.post('/user/createUser/', createUser)

export default userRouter
