import { Document, Model, Types } from "mongoose";

export interface ShippingI {
  country: string;
  country_shipping_fee: number;
  states: [{ name: string; state_shipping_fee: number }];
  use_country_shipping_fee_as_default: boolean;
  created_by: Types.ObjectId;
}

export interface ShippingDocI extends ShippingI, Document {}
export interface ShippingModelI extends Model<ShippingDocI> {
  makeUppercase(): void;
}

export type ShippingBodyT = Omit<ShippingI, "created_by">;

export type LocationAddressT = { country?: string; state?: string };
