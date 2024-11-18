import multer from "multer";
import { uploadNewImage, getAllImages } from "../services/s3.js";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

const upload = multer();

interface IUser {
  user: {
    id: string;
    username: string;
  };
}

interface IRequestWithImageData extends Request {
  file: Express.Multer.File;
  user: IUser["user"];
}

export const uploadImageHandler = async (
  req: IRequestWithImageData,
  res: Response
): Promise<void> => {
  try {
    upload.single("file")(req, res, async (e: any) => {
      if (e) {
        return res
          .status(500)
          .json({ message: "error uploading file", error: e });
      }
      if (!req.file) {
        return res.status(400).json({ message: "did not get file" });
      }
      const fileBuffer = req.file.buffer;
      const fileKey = randomUUID();

      await uploadNewImage({
        imageData: {
          key: fileKey,
          body: fileBuffer,
        },
        usersUsername: req.user.username,
      });
      res.status(200).json({ message: "image successfully uploaded" });
    });
  } catch (e) {
    res.status(500).json({ message: "error uploading image", e });
  }
};

export const getAllImagesHandler = async (req: IUser, res: Response) => {
  try {
    const images = await getAllImages(req.user.username);
    if (images.length > 0) {
      res.status(200).json({ message: "here are the images", images });
      return;
    } else {
      res.status(204).json({ message: "no images were found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "server error" });
    return;
  }
};
