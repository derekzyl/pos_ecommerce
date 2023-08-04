import { Types, Document } from "mongoose";

export interface ProductI {
  name: string;
  description: string;
  discount_percentage: number;
  reviews: Types.ObjectId[];
  category: Types.ObjectId;
  sub_category: Types.ObjectId;
  created_by: Types.ObjectId;
  price: number;
  image: string;
  weight: number;
  featured: boolean;
  available: boolean;
  number_in_stock: number;
  other_image: string[];
  number_of_reviews: number;
  search_tags: string[];
}

// add some features
export interface ProductDocI extends ProductI, Document {}
export type ProductBodyI = Omit<ProductI, "search_tags"> & {
  search_tag: string;
};
