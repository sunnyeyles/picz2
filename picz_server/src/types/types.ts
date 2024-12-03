import { ObjectId } from 'mongoose'
export type User = {
  _idMongo: ObjectId
  _idClerk: string
  email: string
  fName: string
  lName: string
  imageUrls: string[]
}

export type Image = {
  userId: User['_idMongo']
  key: string
  url: string
}
export type NewImageData = {
  key: string
  body: Buffer
}
export type UploadedImagePayload = {
  imageData: NewImageData
}
