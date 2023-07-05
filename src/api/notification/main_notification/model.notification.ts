import { Schema, model } from "mongoose";
import { NotificationDocI } from "../interface_notification/interface.notification";
import { time_stamps } from "../../general_factory/interface/general_factory";
import { MessageTypeE } from "../../sales/online/interface_online/interface.online";

const notificationSchema = new Schema<NotificationDocI>(
  {
    user: { type: Schema.Types.ObjectId, ref: "USER" },
    information: String,
    title: String,
    read_receipt: { type: Boolean, default: false },
    message_type: {
      type: String,
      enum: MessageTypeE,
      default: MessageTypeE.TEXT,
    },
    receiver: { type: Schema.Types.ObjectId, ref: "USER", required: true },
  },
  { timestamps: time_stamps }
);

export const NOTIFICATION = model("NOTIFICATION", notificationSchema);
