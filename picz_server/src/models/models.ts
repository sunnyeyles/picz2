import { Schema, model } from 'mongoose'
import { User as UserType } from '../types/types'
import { Image as ImageType } from '../types/types'

const userSchema = new Schema<UserType>(
  {
    _idMongo: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      auto: true,
    },
    _idClerk: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fName: {
      type: String,
      required: true,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrls: {
      type: [String],
      validate: {
        validator: (urls: string[]): boolean => {
          return urls.every((url) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url))
        },
        message: 'Each URL must be a valid URL.',
      },
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserType>('User', userSchema)