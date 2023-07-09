import { Types, Document } from "mongoose";

type CommentT = {
  user: Types.ObjectId;
  upvote: boolean;
  downvote: boolean;
  comment: string;
};

export interface BlogI {
  title: string;
  body: string;
  image: string;
  remarks?: [CommentT];
  created_by: Types.ObjectId;
  creator_name: string;
}

export interface BlogDocI extends BlogI, Document {}
export type BlogBodyI = Omit<BlogI, "creator_name" | "created_by">;
