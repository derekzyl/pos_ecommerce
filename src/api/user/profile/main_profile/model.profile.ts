import { Schema, model } from "mongoose";
import {
  ProfileDocI,
  ProfileModelI,
} from "../interface_profile/interface.profile";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const profileSchema = new Schema<ProfileDocI, ProfileModelI>(
  {
    first_name: { type: String },
    last_name: { type: String },
    profile_image: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    user: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
  },
  { timestamps: time_stamps }
);

export const PROFILE = model("PROFILE", profileSchema);
