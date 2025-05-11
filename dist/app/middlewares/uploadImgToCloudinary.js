"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadMultipleImgsToCloudinary = exports.uploadImgToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.cloud_api_key,
    api_secret: config_1.default.cloud_api_secret,
});
const uploadImgToCloudinary = (filePath, imgName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(filePath, {
            public_id: imgName.trim(),
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            // delete a file asynchronously
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("File is deleted.");
                }
            });
        })
            .catch((error) => {
            console.log(error);
        });
    });
};
exports.uploadImgToCloudinary = uploadImgToCloudinary;
const uploadMultipleImgsToCloudinary = (files) => {
    // Process each file upload in parallel
    return Promise.all(files.map((file) => (0, exports.uploadImgToCloudinary)(file.path, file.name)));
};
exports.uploadMultipleImgsToCloudinary = uploadMultipleImgsToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    storage: storage,
});
exports.upload = upload;
