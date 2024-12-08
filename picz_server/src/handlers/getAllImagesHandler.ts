import { Request, Response } from 'express'
import { getAllImages } from '../services/s3'
import { User } from '../models/models'

export const getAllImagesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, limit, order } = req.body
    const user = await User.findOne({ _idClerk: userId })
    if (user) {
      console.log(user.images)
      const imageUrls = user.images
      if (user.images.length > 0) {
        const sortedImages = user.images
          .sort((a, b) =>
            order === 'oldest'
              ? new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              : new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
          )
          .slice(0, limit)
        res.status(200).json({ images: sortedImages })
        return
      } else {
        res
          .status(200)
          .json({ message: 'user has no images uploaded', images: [] })
        return
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'server error', error })
    return
  }
}
