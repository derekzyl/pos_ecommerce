import { Schema, model } from "mongoose";
import { ProductDocI } from "../interface_product/interface.product";
import { time_stamps } from "../../general_factory/interface/general_factory";

const productSchema = new Schema<ProductDocI>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    number_in_stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "CATEGORY",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "STAFF",
      required: true,
    },
    search_tags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    number_of_reviews: {
      type: Number,
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "SUB_CATEGORY",
      required: true,
    },
    other_image: [String],
    weight: {
      type: Number,
      required: true,
    },
    discount_percentage: {
      type: Number,
      default: 0,
    },
    featured: Boolean,
    available: Boolean,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "REVIEW",
      },
    ],
  },

  { timestamps: time_stamps }
);

export const PRODUCT = model<ProductDocI>("PRODUCT", productSchema);
