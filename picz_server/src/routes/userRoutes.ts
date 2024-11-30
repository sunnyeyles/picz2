import { Router } from 'express'
import { createNewUser } from '../handlers/clerkWebhook'

const userRouter = Router()

userRouter.post('/webhooks/clerk/', createNewUser)

export default userRouter
