import { Schema, model } from "mongoose";
import {
  CartDocI,
  CartItemDocI,
  CartModelI,
} from "../interface_cart/interface.cart";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const cartSchema = new Schema<CartDocI, CartModelI>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
    products: [{ type: Schema.Types.ObjectId, ref: "CART_ITEM" }],
    sub_total: { type: Number },
    total_shipping_fee: { type: Number },
    vat: { type: Number },
    total_price: { type: Number },
  },
  { timestamps: time_stamps }
);

const cartItemSchema = new Schema<CartItemDocI>({
  product: { type: Schema.Types.ObjectId, ref: "PRODUCT", required: true },
  cart_id: { type: Schema.Types.ObjectId, ref: "CART", required: true },
  product_total_count: Number,
  product_total_price: Number,
  shipping_fee: Number,
});
export const CART_ITEM = model("CART_ITEM", cartItemSchema);
export const CART = model("CART", cartSchema);
