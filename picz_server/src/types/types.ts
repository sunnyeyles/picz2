import { ObjectId } from 'mongoose'
export type User = {
  _idClerk: string
  email: string
  fName: string
  lName: string
  images: Image[]
}

export type Image = {
  _id: ObjectId
  userId: User['_idClerk']
  key: string
  title: string
  description?: string
  url: string
  dateUploaded: Date
}
export type NewImageData = {
  key: string
  body: Buffer
  userId: string
  title?: string
  description?: string
}
export type UploadedImagePayload = {
  imageData: NewImageData
}
