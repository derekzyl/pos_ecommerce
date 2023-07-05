/** @format */

export interface filePropertyI {
  file_data: Buffer;
}

export interface fileValueI {
  file_data: fileDataI;
  image_width?: number;
  image_height?: number;
  image_text?: string;
  file_folder: string;
}
export interface fileDataI {
  field_name: string;
  original_name: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export enum FileTypeE {
  IMAGE = "IMAGE",
  APPLICATION = "APPLICATION",
}

// lets create the file directory format
// 'folder/user/user_model/data'
