import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { uploadNewImage, getAllImages } from '../services/s3'

interface IUser {
  user: {
    id: string
    username: string
  }
}

interface IRequestWithImageData extends Request {
  file?: Express.Multer.File
  user?: IUser['user']
}

type Image = {
  key: string // Unique identifier for the image
  url: string // URL pointing to the image in the S3 bucket
}

type ApiResponse = {
  message: string // A message indicating the response content
  images: Image[] // An array of images
}

export const getAllImagesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const images = await getAllImages()
    console.log(images)

    if (images.length > 0) {
      console.log('There are images')
      res.status(200).json({ message: 'Here are the images', images })
    } else {
      res.status(204).json({ message: 'No images were found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
}
