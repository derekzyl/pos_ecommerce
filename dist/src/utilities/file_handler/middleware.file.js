"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringFileHandler = exports.formFileHandler = exports.multer_upload = void 0;
const multer_1 = __importDefault(require("multer"));
const files_handler_1 = require("./files_handler");
const id_generator_1 = require("../id_generator");
const storage = multer_1.default.memoryStorage();
exports.multer_upload = (0, multer_1.default)({ storage });
// const up = upload.array("upload");
//get object keys
function keys(field) {
    return Object.keys(field);
}
/**
 * formFileHandler function
 *
 * -------------
 * @param field the expected field to be an object
 * @param folder_name the folder name that data will be sent to
 * @returns express js function
 */
const formFileHandler = (field, folder_name, use_email_and_key) => async (request, response, next) => {
    const all_keys = keys(field);
    if (!request.files)
        return next();
    if (request.files) {
        // 1) loop through the key values coming fom the fields
        const body = request.body;
        for (const key of all_keys) {
            const d = request.user && request.user.email
                ? `${request.user.email.split("@")[0]}/${key}/`
                : "";
            // 2) check if the field is an array so we can push data
            if (Array.isArray(field[key])) {
                body[key] = [];
                //3)  check if the field exist in request.files
                if (request.files[key]) {
                    for (const file of request.files[key]) {
                        const file_data = {
                            file_data: file,
                            file_folder: `${folder_name}/`,
                        };
                        const file_name = new files_handler_1.FileHandler(file_data);
                        const j = await file_name.imageHandler();
                        body[key].push(j);
                    }
                }
            }
            else {
                for (const file of request.files[key]) {
                    const file_data = {
                        file_data: file,
                        file_folder: `${folder_name}/`,
                    };
                    const file_name = new files_handler_1.FileHandler(file_data);
                    const j = await file_name.imageHandler();
                    body[key] = j;
                }
            }
        }
        next();
    }
};
exports.formFileHandler = formFileHandler;
/**
 *
 * @param file this is the base 64 string of the image file
 * @param folder_name this is the name of the folder
 * @param key this is the field name that data will be saved
 * @param user this is the logged in user details
 * @returns the file storage location
 */
function stringFileHandler(file, folder_name, key) {
    const split_incoming_string = file.split(",");
    const string_to_buffer = split_incoming_string[1];
    const get_application_type = split_incoming_string[0];
    const get_extension_name = get_application_type.split("/")[1];
    const buffer = Buffer.from(string_to_buffer, "base64");
    const files = {
        field_name: key,
        buffer,
        original_name: `${(0, id_generator_1.dateFunc)()}${(0, id_generator_1.generatekey)(5, id_generator_1.generatekeyE.characters)}.${get_extension_name}`,
        size: buffer.length,
        encoding: "7bit",
        mimetype: get_application_type,
    };
    const file_data = {
        file_folder: `${folder_name}/`,
        file_data: files,
    };
    const file_name = new files_handler_1.FileHandler(file_data);
    return file_name;
}
exports.stringFileHandler = stringFileHandler;
