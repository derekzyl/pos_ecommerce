import { Document } from "mongoose";

export enum VatE {
  LOCAL = "LOCAL",
  ONLINE = "ONLINE",
}

export interface VatI {
  vat_percentage: number;
  vat_name: VatE;
}

export interface VatDocI extends VatI, Document {}
