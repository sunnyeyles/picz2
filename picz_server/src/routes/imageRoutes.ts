import { Router } from 'express'
import multer from 'multer'
import {
  uploadImageHandler,
  getAllImagesHandler,
} from '../handlers/imageHandlers'

const upload = multer()

const imageRouter = Router()

imageRouter.post('/image/newimage/', upload.single('file'), uploadImageHandler)

imageRouter.get('/image/getallimages/', getAllImagesHandler)

export default imageRouter
