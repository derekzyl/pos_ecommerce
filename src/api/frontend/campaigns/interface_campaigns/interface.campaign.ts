import { Document, Types } from "mongoose";
export interface CampaignI {
  image: string;
  is_active: boolean;
  name: string;
  information: string;
}

export interface CampaignDocI extends CampaignI, Document {}

export type CampaignBodyT = CampaignI;

export interface SliderI {
  product: Types.ObjectId;
  is_active: boolean;
}

export interface SliderDocI extends SliderI, Document {}

export type SliderBodyT = SliderI;
