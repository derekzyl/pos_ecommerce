import { Schema, model } from "mongoose";
import { time_stamps } from "../../../general_factory/interface/general_factory";
import { BlogDocI } from "../interface_blog/interface.blog";

const blogSchema = new Schema<BlogDocI>(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    remarks: [
      {
        user: { type: Schema.Types.ObjectId, ref: "PROFILE" },
        upvote: { type: Boolean },
        downvote: { type: Boolean },
        comment: { type: String },
      },
    ],
    creator_name: String,
    created_by: { type: Schema.Types.ObjectId, ref: "USER" },
  },

  { timestamps: time_stamps }
);

export const BLOG = model<BlogDocI>("BLOG", blogSchema);
