import { Schema, model } from 'mongoose'
import { User as UserType, Image as ImageType } from '../types/types'

const imageSchema = new Schema<ImageType>({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (url: string): boolean =>
        /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url),
      message: 'URL must be a valid URL.',
    },
  },
  dateUploaded: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const userSchema = new Schema<UserType>(
  {
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
    images: {
      type: [imageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserType>('User', userSchema)
