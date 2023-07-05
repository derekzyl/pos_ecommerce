/* eslint-disable no-case-declarations */
import sharp from "sharp";
import { createHmac } from "node:crypto";
import * as dotenv from "dotenv";
import { join } from "path";
import { Buffer } from "node:buffer";
import aws from "aws-sdk";
import { v2 as cloudinary } from "cloudinary";
import {
  ImageHandlerI,
  StorageTypeE,
} from "./interface_utilities/image.handler.interface";
import { APP_ERROR } from "./custom_error";
import { HTTP_RESPONSE } from "./http_response";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
class Image {}

export async function imageUploadHandler(image_file: ImageHandlerI) {
  const file_name =
    Math.random().toString(36).substring(2, 10) + "-" + Date.now();

  const file_to_convert = image_file.data?.split(",")[1];
  const get_mime_type = image_file.data!.split(",")[0];
  const file_extension = get_mime_type.split("/")[1];
  const buffer = Buffer.from(file_to_convert!, "base64");

  const buffer_image = sharp(buffer)
    .resize(image_file.width ?? 500, image_file.height ?? 500)
    .toBuffer();

  switch (image_file.storage_type) {
    case StorageTypeE.CLOUDINARY:
      const result = await cloudinary.uploader
        .upload_stream(
          { folder: image_file.image_folder },
          (error: any, result: any) => {
            if (error) {
              throw APP_ERROR(error, HTTP_RESPONSE.BAD_REQUEST);
            } else return { url: result.secure_url };
          }
        )
        .end(buffer_image);
      break;
    case StorageTypeE.SIMPLE_STORAGE_BUCKET:
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      const s3 = new aws.S3();

      const params = {
        Bucket: "your-bucket-name",
        Key: `${image_file.image_folder}/${file_name}`,
        Body: buffer_image,
        ACL: "public-read",
      };

      s3.upload(params, (err: any, data: any) => {
        if (err) {
          throw APP_ERROR(err, HTTP_RESPONSE.BAD_REQUEST);
        }
        return { url: data.location };
        // res.json({ url: data.Location });
      });
      break;
    default:
      break;
  }
}

// export async function imageUpdateHandler(image_file: ImageHandlerI) {

// }

// const imageDeletehandler(id:string){}
