import { Schema, model } from "mongoose";
import { ReviewDocI } from "../interface_review/interface.review";
import { time_stamps } from "../../general_factory/interface/general_factory";

const reviewSchema = new Schema<ReviewDocI>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "PROFILE",
    },
    product: {
      type: Schema.Types.ObjectId,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: time_stamps }
);
// reviewSchema.pre("findOneAndUpdate", function () {
//     this.updated_at
// })

export const REVIEW = model<ReviewDocI>("REVIEW", reviewSchema);
