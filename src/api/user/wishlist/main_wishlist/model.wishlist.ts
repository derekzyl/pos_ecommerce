import { Schema, model } from "mongoose";
import {
  WishlistDocI,
  WishlistModelI,
} from "../interface_wishlist/interface.wishlist";

const wishlistSchema = new Schema<WishlistDocI, WishlistModelI>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
  products: [{ type: Schema.Types.ObjectId, required: true, ref: "PRODUCT" }],
});

export const WISHLIST = model("WISHLIST", wishlistSchema);
