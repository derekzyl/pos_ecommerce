import mongoose, { Schema } from "mongoose";
import { UserI } from "../interface_auth/interface.auth";
import { PermissionsE } from "../../general_factory/interface/general_factory";

const UserSchema = new Schema<UserI>({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  phone: { type: String, required: true },
  permissions: [{ type: String, enum: PermissionsE }],
  token_expires: { type: String },
  token: {
    type: String,
  },
  is_email_verified: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  password_changed_at: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ROLE",
    required: [true, "the user role is required"],
  },
});

export const USER = mongoose.model("USER", UserSchema);
