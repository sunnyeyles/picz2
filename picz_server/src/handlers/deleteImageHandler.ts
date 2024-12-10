import { Request, Response } from 'express'
import { User } from '../models/models'

export const deleteImageHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, imageId } = req.body
    console.log('userId: ', userId)
    console.log('imageId: ', imageId)

    const user = await User.findOne({ _idClerk: userId })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const imageExists = user.images.some(
      (image) => String(image._id) === imageId
    )
    if (!imageExists) {
      res.status(404).json({ message: 'Image not found' })
      return
    }

    user.images = user.images.filter((image) => String(image._id) !== imageId)

    await user.save()

    res.status(200).json({
      message: 'Image deleted successfully',
      images: user.images,
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    res.status(500).json({ message: 'Server error', error })
    return
  }
}
