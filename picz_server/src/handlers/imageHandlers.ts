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

export const uploadImageHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file received' })
      return
    }

    // if (!req.user) {
    //   res.status(401).json({ message: 'Unauthorized: Missing user data' })
    //   return
    // }

    const fileBuffer = req.file.buffer
    const fileKey = randomUUID()

    await uploadNewImage({
      imageData: {
        key: fileKey,
        body: fileBuffer,
      },
      // usersUsername: req.user.username,
    })

    res.status(200).json({ message: 'Image successfully uploaded' })
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error })
  }
}

export const getAllImagesHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    // if (!req.user) {
    //   res.status(401).json({ message: 'Unauthorized: Missing user data' })
    //   return
    // }
    console.log('req.user', req.user)

    const images = await getAllImages()
    console.log(images)
    // const images = await getAllImages(req.user.username)
    if (images.length > 0) {
      console.log('theres images there')
      res.status(200).json({ message: 'Here are the images', images })
    } else {
      res.status(204).json({ message: 'No images were found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
