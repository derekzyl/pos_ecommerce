import { Document, Types } from "mongoose";

export interface ReviewI {
  profile: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment: string;
}

export interface ReviewDocI extends Document, ReviewI {}

export type ReviewBodyT = Omit<ReviewI, "profile">;
