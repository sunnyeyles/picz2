// import { Schema, model } from 'mongoose'
// import { User as UserType } from '../types/types'

// const userSchema = new Schema<UserType>(
//   {
//     _idMongo: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       unique: true,
//       auto: true,
//     },
//     _idClerk: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     fName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     lName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     imageUrls: {
//       type: [String],
//       validate: {
//         validator: (urls: string[]): boolean => {
//           return urls.every((url) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url))
//         },
//         message: 'each URL must be a valid URL.',
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// export const User = model<UserType>('User', userSchema)
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
})

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
