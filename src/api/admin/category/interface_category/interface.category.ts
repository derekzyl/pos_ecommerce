import { Document, Types } from "mongoose";

export interface categoryI extends Document {
  name: string;
  image: string;
}

export interface subCategoryI extends Document {
  image:string
  category: Types.ObjectId;
  name: string;

}
