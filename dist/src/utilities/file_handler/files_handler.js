"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
//todo sharp lets go
const sharp_1 = __importDefault(require("sharp"));
const cloudinary_1 = require("./cloudinary");
class FileHandler {
    file_data;
    sharp;
    image_width;
    image_height;
    image_text;
    file_type;
    file_ext_name;
    file_folder;
    constructor(file_value) {
        this.file_data = file_value.file_data.buffer;
        this.file_folder = file_value.file_folder;
        (this.image_width = file_value.image_width ?? 500),
            (this.image_height = file_value.image_height ?? 500);
        this.sharp = (0, sharp_1.default)(this.file_data);
        this.image_text = file_value.image_text ?? "";
        this.file_type = file_value.file_data.mimetype.split("/")[0];
        this.file_ext_name = file_value.file_data.mimetype.split("/")[1];
        if (this.file_type === "image") {
            this.imageHandler();
        }
        if (this.file_type === "application") {
            this.fileHandler();
        }
    }
    async imageHandler() {
        const svgImg = /*html*/ `
    <svg width="${this.image_width}" height="${this.image_height}">
      <style>
      .title { fill: #001; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${this.image_text}</text>
    </svg>
`;
        const svgBuffer = Buffer.from(svgImg);
        const val = await this.sharp
            .resize({
            width: this.image_width,
            height: this.image_height,
        })
            .composite([
            {
                input: svgBuffer,
                top: 0,
                left: 0,
            },
        ])
            .jpeg({ quality: 90 })
            .toBuffer();
        const data = new cloudinary_1.CloudinaryHandler();
        const v = await data.uploadImageOrFileToCloudinary(val, this.file_folder);
        // const b =
        // .toFile(`uploads/${this.user}/${this.file_name}`);
        return v;
    }
    async fileHandler() {
        const data = new cloudinary_1.CloudinaryHandler();
        const v = await data.uploadImageOrFileToCloudinary(this.file_data, this.file_folder);
        // writeFile(`uploads/${this.user}/${this.file_name}`, this.file_data, (err) =>
        //   console.log(err)
        // );
        // return this.file_name;
        return v;
    }
}
exports.FileHandler = FileHandler;
