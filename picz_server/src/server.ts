import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './utils/utils'
import imageRouter from './routes/imageRoutes'
import userRouter from './routes/userRoutes'
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', imageRouter)
app.use('/api', userRouter)
export default app
