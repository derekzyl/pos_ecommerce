import { Document, Types } from "mongoose";
export enum DeliveryStatusE {
  RECEIVED_BY_CUSTOMER = "RECEIVED_BY_CUSTOMER",
  DISPATCHED = "DISPATCHED",
  ON_TRANSIT = "ON_TRANSIT",
  PENDING = "PENDING",
  DELIVERED_BY_DISPATCHER = "DELIVERED_BY_DISPATCHER",
}
export enum DispatchCompany {
  DHL = "DHL",
  FEDEX = "FEDEX",
  OTHERS = "OTHERS",
}
export interface DispatchI {
  order_id: string;
  tracking_id: string;
  is_dispatched?: boolean;
  dispatched_by?: Types.ObjectId;
  dispatched_to: Types.ObjectId;
  user_has_received: boolean;
  dispatcher_has_dispatched: boolean;
  dispatch_company: {
    dispatch_company_track_id?: string;
    dispatch_company_name: DispatchCompany;
  };
  dispatched_at?: Date;
  received_at?: Date;
  delivery_status?: DeliveryStatusE;
}

export interface DispatchDocI extends DispatchI, Document {}

export type DispatchBodyT = DispatchI;
