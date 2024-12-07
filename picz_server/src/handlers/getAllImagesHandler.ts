import { Request, Response } from 'express'
import { getAllImages } from '../services/s3'
import { User } from '../models/models'

export const getAllImagesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body
    const user = await User.findOne({ _idClerk: userId })
    if (user) {
      console.log(user.images)
      const imageUrls = user.images
      if (user.images.length > 0) {
        res.status(200).json({ images: user.images })
        return
      } else {
        res
          .status(200)
          .json({ message: 'user has no images uploaded', images: [] })
        return
      }
    }
    // const images = await getAllImages(userId)
    // if (images.length > 0) {
    //   res.status(200).json({ images: images })
    //   return
    // } else {
    //   res
    //     .status(200)
    //     .json({ message: 'user has no images uploaded', images: [] })
    //   return
    // }
  } catch (error) {
    res.status(500).json({ message: 'server error', error })
    return
  }
}
