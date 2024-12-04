import { Router } from 'express'
import multer from 'multer'
import { uploadImageHandler } from '../handlers/uploadImageHandler'
import { getAllImagesHandler } from '../handlers/getAllImagesHandler'

const upload = multer()

const imageRouter = Router()

imageRouter.post(
  '/image/uploadimage/',
  upload.single('file'),
  uploadImageHandler
)

imageRouter.post('/image/getallimages/', getAllImagesHandler)

export default imageRouter
