import { Document, Types } from "mongoose";

type ProductT = {
  product: Types.ObjectId;
  quantity: number;
};

export interface InventoryI {
  name: string;
  inventory_id: string;
  products: ProductT[];
  inventory_receipt?: string;
}

export interface InventoryDocI extends InventoryI, Document {}
export interface DistributeInventoryDocI extends Document, InventoryI {
  branch: Types.ObjectId;
}

export interface InventoryBodyI {
  inventory_id: string;
  products: ProductT[];
  inventory_receipt?: string;
}

export interface DistributeInventoryBodyI extends InventoryI {
  branch: Types.ObjectId;
}
