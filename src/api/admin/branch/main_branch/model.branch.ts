import { Schema, model } from "mongoose";
import { BranchTypeE, branchI } from "../interface_branch/interface.branch";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const branchSchema = new Schema<branchI>(
  {
    name: { type: String, unique: true, required: true },
    location: { longitude: String, latitude: String },
    location_address: String,
    country: String,
    number_of_staff: Number,
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "PRODUCT",
        },
        amount_in_stock: Number,
      },
    ],
    branch_type: {
      type: String,
      enum: BranchTypeE,
      default: BranchTypeE.LOCAL,
    },
    state: { type: String },
  },
  { timestamps: time_stamps }
);

branchSchema.pre("save", function () {
  this.name = String(this.name).toLocaleUpperCase();
});

export const BRANCH = model("BRANCH", branchSchema);
