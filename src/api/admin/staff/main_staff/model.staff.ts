import { Schema, model } from "mongoose";
import { StaffI } from "../interface_staff/interface.staff";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const staffSchema = new Schema<StaffI>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  first_name: {
    type: String,
  },
  image: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  bank_details: {
    bank_name: String,
    account_number: Number,
    account_name: String,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "BRANCH",
    required: true,
  }
},{timestamps:time_stamps});

export const STAFF = model("STAFF", staffSchema);
