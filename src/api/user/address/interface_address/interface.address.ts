import { Types, Document, Model } from "mongoose";

export interface AddressI {
  user: Types.ObjectId;
  address: string;
  phone: string;
  country: string;
  state: string;
  local_government: string;
  name: string;
  zip_code: string;
  is_default: boolean;
}

export interface AddressDocI extends Document, AddressI {}
export interface AddressModelI extends Model<AddressDocI> {
  checkDefaultAddress(): void;
}

export type AddressBodyT = Omit<AddressI, "user">;
