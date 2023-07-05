import { Schema, model } from "mongoose";
import { VatE, VatDocI } from "../interface_vat/interface.vat";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const vatSchema = new Schema<VatDocI>(
  {
    vat_percentage: Number,
    vat_name: {
      enum: VatE,
      required: true,
      type: String,
    },
  },
  { timestamps: time_stamps }
);

export const VAT = model<VatDocI>("VAT", vatSchema);
