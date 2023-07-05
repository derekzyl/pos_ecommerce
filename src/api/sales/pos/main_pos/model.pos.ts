import { Schema, model } from "mongoose";
import { PosDocI } from "../interface_pos/interface.pos";
import {
  OrderStatusE,
  OrderTypeE,
  PaymentMethodE,
  PaymentStatusE,
  SalesTypeE,
} from "../../interface_sales/interface.sales";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const posSchema = new Schema<PosDocI>(
  {
    order_id: { type: String },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "PRODUCT",
        },
        quantity_of_product: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    server_total: {
      type: Number,
      required: true,
    },
    order_type: {
      type: String,
      enum: OrderTypeE,
      default: OrderTypeE.RETAIL,
    },
    payment_method: {
      type: String,
      enum: PaymentMethodE,
    },
    order_status: {
      type: String,
      enum: OrderStatusE,
    },
    payment_status: {
      type: String,
      enum: PaymentStatusE,
      default: PaymentStatusE.PENDING,
    },
    sold_by: {
      type: Schema.Types.ObjectId,
      ref: "STAFF",
    },
    sales_type: {
      type: String,
      enum: SalesTypeE,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "BRANCH",
    },
    vat: {
      type: Number,
    },
    original_amount: Number,
    discount: Number,
    total_amount: Number,
    amount_sold: Number,
    server_amount_sold: {
      type: Number,
      required: true,
    },
  },
  { timestamps: time_stamps }
);

export const POS = model<PosDocI>("POS", posSchema);
