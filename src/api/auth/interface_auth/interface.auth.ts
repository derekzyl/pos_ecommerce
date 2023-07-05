import { Request } from "express";
import mongoose from "mongoose";
import { PermissionsE } from "../../general_factory/interface/general_factory";

enum GenderE {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface UserI extends mongoose.Document {
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  phone: string;
  role?: mongoose.Types.ObjectId;
  is_email_verified?: boolean;
  token?: string;
  token_expires?: any;
  password_changed_at?: Date;
  is_deleted?: boolean;
  permissions: PermissionsE[];
}

export interface RequestBody extends Request {
  user: any;
  role: any;
  params: any;
}
