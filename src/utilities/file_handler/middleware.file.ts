import { NextFunction, Response, Request } from "express";
import multer from "multer";
import { UserI } from "../../api/auth/interface_auth/interface.auth";
import {
  fileValueI,
  fileDataI,
} from "../interface_utilities/file_handler.interface";
import { FileHandler } from "./files_handler";
import { dateFunc, generatekey, generatekeyE } from "../id_generator";

const storage = multer.memoryStorage();

export const multer_upload = multer({ storage });

// const up = upload.array("upload");
//get object keys
function keys<T extends object>(field: T) {
  return Object.keys(field) as (keyof T)[];
}

/**
 * formFileHandler function
 *
 * -------------
 * @param field the expected field to be an object
 * @param folder_name the folder name that data will be sent to
 * @returns express js function
 */
export const formFileHandler =
  <T extends object>(
    field: T,
    folder_name: string,
    use_email_and_key: boolean
  ) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const all_keys = keys<T>(field);

    if (!request.files) return next();
    if (request.files) {
      // 1) loop through the key values coming fom the fields
      const body: any = request.body;

      for (const key of all_keys) {
        const d =
          request.user && request.user.email
            ? `${request.user.email.split("@")[0]}/${key as string}/`
            : "";
        // 2) check if the field is an array so we can push data
        if (Array.isArray(field[key])) {
          body[key] = [];
          //3)  check if the field exist in request.files
          if (request.files[key]) {
            for (const file of request.files[key]) {
              const file_data: fileValueI = {
                file_data: file,
                file_folder: `${folder_name}/` + use_email_and_key ? d : "",
              };
              const file_name = new FileHandler(file_data);
              const j = await file_name.imageHandler();
              body[key].push(j);
            }
          }
        } else {
          for (const file of request.files[key]) {
            const file_data: fileValueI = {
              file_data: file,
              file_folder: `${folder_name}/` + use_email_and_key ? d : "",
            };
            const file_name = new FileHandler(file_data);
            const j = await file_name.imageHandler();
            body[key] = j;
          }
        }
      }
      next();
    }
  };

/**
 *
 * @param file this is the base 64 string of the image file
 * @param folder_name this is the name of the folder
 * @param key this is the field name that data will be saved
 * @param user this is the logged in user details
 * @returns the file storage location
 */
export function stringFileHandler(
  file: string,
  folder_name: string,
  key: string,
  use_email_and_key: boolean,
  user?: UserI
) {
  const split_incoming_string = file.split(",");
  const string_to_buffer = split_incoming_string[1];
  const get_application_type = split_incoming_string[0];
  const get_extension_name = get_application_type.split("/")[1];
  const buffer = Buffer.from(string_to_buffer, "base64");
  let d = "";

  if (use_email_and_key && user)
    d = `${user.email.split(".")[0]}/${key as string}/`;

  const files: fileDataI = {
    field_name: key,
    buffer,
    original_name: `${dateFunc()}${generatekey(
      5,
      generatekeyE.characters
    )}.${get_extension_name}`,
    size: buffer.length,
    encoding: "7bit",
    mimetype: get_application_type,
  };
  const file_data: fileValueI = {
    file_folder: `${folder_name}/${d}`,
    file_data: files,
  };
  const file_name = new FileHandler(file_data);
  return file_name;
}
