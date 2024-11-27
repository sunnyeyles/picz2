import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { uploadNewImage } from '../services/s3'
interface IRequestWithImageData extends Request {
  file?: Express.Multer.File
}

interface IImageData {
  key: string
  body: Buffer
}

export const uploadImageHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    console.log('This is what is being sent from the server: ', req.body)

    if (!req.file) {
      res.status(400).json({ message: 'No file received' })
      return
    }

    const fileBuffer = req.file.buffer
    const fileKey = randomUUID()

    const imageData: IImageData = {
      key: fileKey,
      body: fileBuffer,
    }

    await uploadNewImage({
      imageData,
    })

    res.status(200).json({ message: 'Image successfully uploaded' })
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error })
  }
}
