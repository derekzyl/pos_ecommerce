export enum StorageTypeE {
  CLOUDINARY = "CLOUDINARY",
  LOCAL = "LOCAL",
  SIMPLE_STORAGE_BUCKET = "SIMPLE_STORAGE_BUCKET",
}

export enum FolderNameE {
  USER_PROFILE_IMAGE = "USER_PROFILE_IMAGE",
  PRODUCT_IMAGE = "PRODUCT_IMAGE",
  STAFF_PROFILE_IMAGE = "STAFF_PROFILE_IMAGE",
}
export interface ImageHandlerI {
  data: string;
  name: string;
  width: number;
  height: number;
  image_folder: FolderNameE;
  storage_type: StorageTypeE;
  image_path?: string;
}
