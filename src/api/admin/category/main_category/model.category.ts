import { Schema, model } from "mongoose";
import {
  categoryI,
  subCategoryI,
} from "../interface_category/interface.category";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const categorySchema = new Schema<categoryI>(
  {
    name: { type: String, required: true },
    image: String,
  },
  { timestamps: time_stamps }
);

const subCategorySchema = new Schema<subCategoryI>(
  {
    name: { type: String, required: true, uppercase: true },
    category: { type: Schema.Types.ObjectId, ref: "CATEGORY", required: true },
    image: String,
  },
  { timestamps: time_stamps }
);
categorySchema.pre("save", function () {
  this.name = this.name.trim().toLocaleUpperCase();
});

subCategorySchema.pre("save", function () {
  this.name = this.name.trim().toLocaleUpperCase();
});

export const CATEGORY = model<categoryI>("CATEGORY", categorySchema);
export const SUB_CATEGORY = model<subCategoryI>(
  "SUB_CATEGORY",
  subCategorySchema
);
