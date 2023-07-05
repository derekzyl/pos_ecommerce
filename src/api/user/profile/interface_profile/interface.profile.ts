import { Types, Document, Model } from "mongoose";

export interface ProfileI {
  user: Types.ObjectId;
  first_name: string;
  last_name: string;
  profile_image: string;
  gender: "male" | "female";
}

export interface ProfileDocI extends Document, ProfileI {}
export interface ProfileModelI extends Model<ProfileDocI> {
  checkDefaultProfile(): void;
}

export type ProfileBodyT = Omit<ProfileI, "user"> & {
  user_id: Types.ObjectId;
};
