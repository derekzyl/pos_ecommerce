import { Schema, model } from "mongoose";
import { time_stamps } from "../../../general_factory/interface/general_factory";

import {
  SliderDocI,
  CampaignDocI,
} from "../interface_campaigns/interface.campaign";

const campaignSchema = new Schema<SliderDocI>(
  {
    product: { type: Schema.Types.ObjectId, ref: "PRODUCT" },
    is_active: { type: Boolean, default: false },
  },
  { timestamps: time_stamps }
);

export const SLIDER = model("SLIDER", campaignSchema);

const sliderSchema = new Schema<CampaignDocI>(
  {
    image: String,
    is_active: { type: Boolean, default: false },
    name: { type: String },
    information: { type: String },
  },
  { timestamps: time_stamps }
);

export const CAMPAIGN = model("CAMPAIGN", sliderSchema);
