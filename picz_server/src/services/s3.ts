import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { UploadedImagePayload as UploadedImagePayloadType } from '../types/types'
dotenv.config()
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY
const bucketName = process.env.AWS_S3_BUCKET_NAME
const awsRegion = process.env.AWS_REGION

export const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretKey!,
  },
})

export const uploadNewImage = async (
  payload: UploadedImagePayloadType
): Promise<any> => {
  const { imageData } = payload
  const { key, body } = imageData
  try {
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: 'image/jpeg',
      })
    )

    return response
  } catch (err) {
    console.log(err)
  }
}

export const getAllImages = async (userId: string): Promise<any[] | []> => {
  try {
    const prefix = userId
    const data = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      })
    )

    if (data.Contents && data.Contents.length > 0) {
      const imageUrls = await Promise.all(
        data.Contents.map(async (item) => {
          if (item.Key) {
            const url = await getSignedUrl(
              s3Client,
              new GetObjectCommand({
                Bucket: bucketName,
                Key: item.Key,
              }),
              { expiresIn: 3600 }
            )
            return { key: item.Key, url }
          }
          return null
        })
      )
      return imageUrls.filter((img) => img !== null)
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}
