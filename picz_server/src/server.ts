import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './utils/utils'
import imageRouter from './routes/imageRoutes'
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', imageRouter)
export default app
