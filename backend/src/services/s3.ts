import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { UUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const awsRegion = process.env.AWS_REGION;

interface IImageData {
  key: string;
  body: Buffer;
}

interface IUploadNewImagePayload {
  imageData: IImageData;
  usersUsername: string;
}
interface IImage {
  key: string;
  url?: string;
}

export const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretKey!,
  },
});

export const uploadNewImage = async (
  payload: IUploadNewImagePayload
): Promise<void> => {
  const { imageData, usersUsername } = payload;
  const { key, body } = imageData;
  try {
    const userDirectoryPath = `${usersUsername}/`;
    const fullKey = `${userDirectoryPath}${key}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fullKey,
        Body: body,
        ContentType: "image/jpeg",
      })
    );
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getAllImages = async (
  username: string
): Promise<IImage[] | []> => {
  try {
    const userDirectoryPath = `${username}/`;
    const data = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: userDirectoryPath,
      })
    );

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
            );
            return { key: item.Key, url };
          }
          return null;
        })
      );
      return imageUrls.filter((img) => img !== null);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
