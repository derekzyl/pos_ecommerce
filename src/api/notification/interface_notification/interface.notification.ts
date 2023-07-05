import { MessageT } from "../../sales/online/interface_online/interface.online";
import { Document, Types } from "mongoose";
export interface NotificationT
  extends Omit<MessageT, "created_at" | "updated_at"> {
  user: Types.ObjectId;
  read_receipt: boolean;
  receiver: Types.ObjectId
}

export interface NotificationDocI extends NotificationT, Document {}

export type NotificationBodyT = MessageT;
