import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { uploadNewImage as uploadImageToS3 } from '../services/s3'
import { User } from '../models/models'
import * as dotenv from 'dotenv'

dotenv.config()
const awsRegion = process.env.AWS_REGION
interface IRequestWithImageData extends Request {
  file?: Express.Multer.File
}

interface IImageData {
  key: string
  body: Buffer
  userId: string
  title: string
  description?: string
}

export const uploadImageHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    const { userId, title, description } = req.body

    if (!req.file) {
      res.status(400).json({ message: 'No file received' })
      return
    }
    const fileBuffer = req.file.buffer
    const fileKey = `${userId}/${randomUUID()}`
    const bucketName = process.env.AWS_S3_BUCKET_NAME

    const imageData: IImageData = {
      key: fileKey,
      body: fileBuffer,
      userId: userId,
      title: title,
      description: description,
    }
    const user = await User.findOne({ _idClerk: userId })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const S3Response = await uploadImageToS3({
      imageData,
    })
    const imageUrl = `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${fileKey}`

    const newImage = {
      userId,
      key: fileKey,
      title,
      description,
      url: imageUrl,
    }

    user.images.push(newImage)

    await user.save()

    res.status(200).json({
      message: `Image successfully uploaded to S3 this is the response: ${S3Response.$metadata}`,
    })

    return S3Response.$metadata
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error })
  }
}
