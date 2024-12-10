import { Request, Response } from 'express'
import { User } from '../models/models'
export const getAllImagesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, limit = 50, order = 'descending' } = req.body

    const user = await User.findOne({ _idClerk: userId })
    if (user) {
      const imageUrls = user.images

      if (imageUrls.length > 0) {
        const sortedImages = [...imageUrls]
          .sort((a, b) => {
            const dateA = new Date(a.dateUploaded || a.dateUploaded).getTime()
            const dateB = new Date(b.dateUploaded || b.dateUploaded).getTime()

            return order === 'ascending' ? dateA - dateB : dateB - dateA
          })
          .slice(0, limit)

        res.status(200).json({ images: sortedImages })
        console.log('Sorted Images: ', sortedImages)
        return
      } else {
        res
          .status(200)
          .json({ message: 'user has no images uploaded', images: [] })
        return
      }
    } else {
      res.status(404).json({ message: 'User not found' })
      return
    }
  } catch (error) {
    console.error('Error in getAllImagesHandler:', error)
    res.status(500).json({ message: 'server error', error })
    return
  }
}
