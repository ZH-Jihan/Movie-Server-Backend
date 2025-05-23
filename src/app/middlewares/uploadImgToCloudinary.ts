import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import fs from "fs";
import multer from "multer";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

export const uploadImgToCloudinary = (
  filePath: string,
  imgName: string
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(
        filePath,
        {
          public_id: imgName.trim(),
        },
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result as UploadApiResponse);
          // delete a file asynchronously
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("File is deleted.");
            }
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  });
};

export const uploadMultipleImgsToCloudinary = (
  files: Array<{ path: string; name: string }>
): Promise<Array<Record<string, unknown>>> => {
  // Process each file upload in parallel
  return Promise.all(
    files.map((file) => uploadImgToCloudinary(file.path, file.name))
  );
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  storage: storage,
});

export { upload };
