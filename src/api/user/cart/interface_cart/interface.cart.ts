import { Types, Document, Model } from "mongoose";

export type ProductAndCount = {
  product: Types.ObjectId;
  product_total_count: number;
  product_total_price: number;
  shipping_fee: number;
};
export interface CartI {
  user: Types.ObjectId;
  products: Types.ObjectId[];
  total_price: number;
  vat: number;
  sub_total: number;
  total_shipping_fee: number;
}

export interface CartDocI extends Document, CartI {}
export interface CartModelI extends Model<CartDocI> {
  checkDefaultWishlist(): void;
}

export interface CartItemDocI extends ProductAndCount, Document {
  cart_id: Types.ObjectId;
}
export type CartItemBodyT = ProductAndCount;
export type CartBodyT = Omit<CartI, "user" | "products">;
