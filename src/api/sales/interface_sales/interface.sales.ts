import { Types } from "mongoose";

export enum OrderStatusE {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export enum SalesTypeE {
  ONLINE_SALES = "ONLINE_SALES",
  STORE_SALES = "STORE_SALES",
}

export enum OrderTypeE {
  WHOLESALE = "WHOLE_SALE",
  RETAIL = "RETAIL",
}

export type ProductT = {
  product: Types.ObjectId;
  quantity_of_product: number;
  total: number;
};

export enum PaymentStatusE {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DISPUTE = "DISPUTE",
  DECLINED = "DECLINED",
  INITIALIZED = "INITIALIZED",
}

export enum PaymentMethodE {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  PAYONEER = "PAYONEER",
  BANK_TRANSFERS = "BANK_TRANSFERS",
  USSD = "USSD",
  POS = "POS",
}

export interface SalesI {
  order_id: string;
  products: ProductT[];
  order_type: OrderTypeE;
  payment_method: PaymentMethodE;
  order_status: OrderStatusE;
  payment_status: PaymentStatusE;
  sold_by: Types.ObjectId;
  sales_type: SalesTypeE;
  branch: Types.ObjectId;
  vat: number;
  discount: number;
  original_amount: number;
  total_amount: number;
  amount_sold: number;
  server_total: number;
  server_amount_sold: number;
}
