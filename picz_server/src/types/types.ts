// interface IRequestWithImageData extends Request {
//   file?: Express.Multer.File
//   user?: IUser['user']
// }
import { ObjectId } from 'mongoose'
export type User = {
  _idMongo: ObjectId
  _idClerk: string
  email: string
  fName: string
  lName: string
  imageUrls: string[]
}

// export type Image = {
//   key: string
//   url: string
// }

export type ApiResponse = {
  //   message: string
  images: Image[]
}

export type Image = {
  key: string
  url: string
  userId: string
}
