import { Document, Types } from "mongoose";
import {
  OrderTypeE,
  PaymentMethodE,
  ProductT,
  PaymentStatusE,
  SalesI,
} from "../../interface_sales/interface.sales";

export interface PosDocI extends Document, SalesI {}

export type PosDbI = SalesI;

export interface PosBodyI {
  products: ProductT[];
  order_type: OrderTypeE;
  payment_method: PaymentMethodE;

  payment_status: PaymentStatusE;

  original_amount: number;
  discount: number;
  total_amount: number;

  amount_sold: number;
}
