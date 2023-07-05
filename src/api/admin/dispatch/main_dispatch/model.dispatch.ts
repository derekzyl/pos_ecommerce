import { Schema, model } from "mongoose";
import { time_stamps } from "../../../general_factory/interface/general_factory";
import {
  DeliveryStatusE,
  DispatchCompany,
  DispatchDocI,
} from "../interface_dispatch/interface.dispatch";

const dispatchSchema = new Schema<DispatchDocI>(
  {
    order_id: { type: String, required: true },
    tracking_id: { type: String },
    is_dispatched: { type: Boolean, default: false },
    dispatcher_has_dispatched: { type: Boolean, default: false },
    user_has_received: { type: Boolean, default: false },
    dispatched_by: { type: Schema.Types.ObjectId, ref: "USER" },
    dispatched_to: { type: Schema.Types.ObjectId, ref: "USER" },

    dispatch_company: {
      dispatch_company_track_id: { type: String },
      dispatch_company_name: {
        type: String,
        default: DispatchCompany.DHL,
        enum: DispatchCompany,
      },
    },

    dispatched_at: Date,
    delivery_status: {
      type: String,
      enum: DeliveryStatusE,
      default: DeliveryStatusE.PENDING,
    },
    received_at: Date,
  },
  { timestamps: time_stamps }
);

export const DISPATCH = model("DISPATCH", dispatchSchema);
