import { Router } from 'express'
import multer from 'multer'
import { uploadImageHandler } from '../handlers/uploadImageHandler'
import { getAllImagesHandler } from '../handlers/getAllImagesHandler'
import { deleteImageHandler } from '../handlers/deleteImageHandler'

const upload = multer()

const imageRouter = Router()

imageRouter.post(
  '/image/uploadimage/',
  upload.single('file'),
  uploadImageHandler
)
imageRouter.post('/image/deleteimage/', deleteImageHandler)

imageRouter.post('/image/getallimages/', getAllImagesHandler)

export default imageRouter
