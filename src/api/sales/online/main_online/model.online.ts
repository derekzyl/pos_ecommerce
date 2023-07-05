import { Schema, model } from "mongoose";
import {
  AcceptanceStatusE,
  MessageTypeE,
  OnlineDocI,
  OnlineModelI,
  OnlineOrderStatusE,
} from "../interface_online/interface.online";
import {
  OrderTypeE,
  PaymentMethodE,
  PaymentStatusE,
  SalesTypeE,
} from "../../interface_sales/interface.sales";
import { time_stamps } from "../../../general_factory/interface/general_factory";

export const onlineSchema = new Schema<OnlineDocI, OnlineModelI>(
  {
    user: { type: Schema.Types.ObjectId, ref: "USER" },

    order_id: { type: String, required: true, unique: true },
    order_status: {
      type: String,
      enum: OnlineOrderStatusE,
      default: OnlineOrderStatusE.REQUEST_PENDING,
    },
    transfer_handling: [
      {
        to: {
          type: Schema.Types.ObjectId,
          ref: "USER",
        },
        from: {
          type: Schema.Types.ObjectId,
          ref: "USER",
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        acceptance_status: {
          type: String,
          enum: AcceptanceStatusE,
          default: AcceptanceStatusE.PENDING,
        },
      },
    ],
    handled_by: {
      type: Schema.Types.ObjectId,
      ref: "USER",
    },
    is_being_handled: { type: Boolean, default: false },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "PRODUCT",
        },
        product_total_count: { type: Number },
        product_total_price: { type: Number },
        shipping_fee: { type: Number },
      },
    ],
    branch: {
      type: Schema.Types.ObjectId,
      ref: "BRANCH",
    },
    order_type: {
      type: String,
      enum: OrderTypeE,
      default: OrderTypeE.RETAIL,
    },
    payment_method: {
      type: String,
      enum: PaymentMethodE,
      default: PaymentMethodE.CREDIT_CARD,
    },
    payment_status: {
      type: String,
      enum: PaymentStatusE,
      default: PaymentStatusE.INITIALIZED,
    },
    sold_by: {
      type: Schema.Types.ObjectId,
      ref: "USER",
    },
    sales_type: {
      type: String,
      enum: SalesTypeE,
      default: SalesTypeE.ONLINE_SALES,
    },
    date_ordered: Date,

    vat: { type: Number },
    discount: { type: Number },
    total_amount: { type: Number },
    original_amount: { type: Number },
    amount_sold: { type: Number },
    server_amount_sold: { type: Number },
    server_total: { type: Number },
    is_ready_for_dispatch: Boolean,
    address: {
      type: Schema.Types.ObjectId,
      ref: "ADDRESS",
      required: true,
    },
    message: [
      {
        title: { type: String },
        text: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        read_receipt: { type: Boolean, default: false },
        message_type: {
          type: String,
          enum: MessageTypeE,
          default: MessageTypeE.TEXT,
        },
      },
    ],
    dispatch: { type: Schema.Types.ObjectId, ref: "DISPATCH" },
  },
  { timestamps: time_stamps }
);

export const ONLINE_ORDER = model("ONLINE_ORDER", onlineSchema);
