import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { uploadNewImage as uploadImageToS3 } from '../services/s3'
interface IRequestWithImageData extends Request {
  file?: Express.Multer.File
}

interface IImageData {
  key: string
  body: Buffer
  userId: string
}

export const uploadImageHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body

    if (!req.file) {
      res.status(400).json({ message: 'No file received' })
      return
    }
    const fileBuffer = req.file.buffer
    const fileKey = `${userId}/${randomUUID()}.png`

    const imageData: IImageData = {
      key: fileKey,
      body: fileBuffer,
      userId: userId,
    }

    const S3Response = await uploadImageToS3({
      imageData,
    })
    res.status(200).json({
      message: `Image successfully uploaded to S3 this is the response: ${S3Response.$metadata}`,
    })
    return S3Response.$metadata
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error })
  }
}
