import { Request, Response } from 'express'
import { getAllImages } from '../services/s3'

export const getAllImagesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const images = await getAllImages()
    if (images.length > 0) {
      console.log(images)
      res.status(200).json({ images: images })
      return
    } else {
      res.status(404).json({ message: 'no images were found' })
      return
    }
  } catch (error) {
    res.status(500).json({ message: 'server error', error })
    return
  }
}
