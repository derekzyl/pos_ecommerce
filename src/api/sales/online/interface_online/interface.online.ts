import { Model, Types } from "mongoose";
import { SalesI } from "../../interface_sales/interface.sales";
import { ProductAndCount } from "../../../user/cart/interface_cart/interface.cart";
import { DateTime } from "aws-sdk/clients/devicefarm";
import { CreateUserT } from "../../../auth/interface_auth/interface.auth";
import { AddressBodyT } from "../../../user/address/interface_address/interface.address";

export enum MessageTypeE {
  TEXT = "TEXT",
  URL = "URL",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum OnlineOrderStatusE {
  PAYMENT_SUCCESSFUL = "PAYMENT_SUCCESSFUL",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  REQUEST_PENDING = "REQUEST_PENDING",
  ORDER_PACKAGED = "ORDER_PACKAGED",
  ORDER_DISPATCHED = "ORDER_DISPATCHED",
  ORDER_DELIVERED = "ORDER_DELIVERED",
}

export enum AcceptanceStatusE {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export type MessageT = {
  title: string;
  information: string;
  created_at: Date;
  updated_at: Date;
  read_receipt: boolean;
  message_type: MessageTypeE;
};

export interface OnlineI extends Omit<SalesI, "products" | "order_status"> {
  products: ProductAndCount[];
  address: Types.ObjectId;
  user: Types.ObjectId;
  order_status: OnlineOrderStatusE;
  dispatch: Types.ObjectId;
  is_ready_for_dispatch: boolean;
  transfer_handling: [
    {
      from: Types.ObjectId;
      to: Types.ObjectId;
      time: Date;
      acceptance_status: AcceptanceStatusE;
    }
  ];
  handled_by: Types.ObjectId;
  is_being_handled: boolean;
  message: MessageT[];
  date_ordered: Date;
  updated_by: Types.ObjectId;
}

export interface OnlineDocI extends OnlineI, Document {}
export type OnlineBodyT = {
  cart_items: Types.ObjectId[];
  address?: Types.ObjectId;
};

export interface OnlineModelI extends Model<OnlineDocI> {
  paymentStatus(): boolean;
}

// export type OnlineBodyT = Pick<OnlineI,  "address"| ""  |||||||||    >

export interface notLoggedIn {
  user?: CreateUserT;
  address: AddressBodyT;
  products: Pick<ProductAndCount, "product" | "product_total_count">[];
}
