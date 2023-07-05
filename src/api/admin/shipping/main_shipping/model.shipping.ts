import { Schema, model } from "mongoose";
import {
  ShippingDocI,
  ShippingModelI,
} from "../interface_shipping/interface.shipping";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const shippingSchema = new Schema<ShippingDocI, ShippingModelI>(
  {
    country: { type: String, required: true, uppercase: true },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
    country_shipping_fee: {
      type: Number,
      required: true,
      uppercase: true,
      unique: true,
    },
    use_country_shipping_fee_as_default: {
      type: Boolean,
      required: true,
      default: false,
    },

    states: [
      {
        name: { type: String, uppercase: true, unique: true },
        state_shipping_fee: { type: Number },
      },
    ],
  },
  { timestamps: time_stamps }
);
shippingSchema.pre("save", function () {
  if (this.use_country_shipping_fee_as_default === true) {
    this.states.map((data) => {
      return { name: data.name, state_shipping_fee: this.country_shipping_fee };
    });
  }
});
export const SHIPPING = model("SHIPPING", shippingSchema);
