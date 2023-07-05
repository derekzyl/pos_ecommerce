import * as dotenv from "dotenv";
import { customMessageI } from "./interface_utilities/response_message";
dotenv.config();
/**
 *
 * @param {customMessageI} msg
 * @returns
 */
export function responseMessage(msg: customMessageI) {
  switch (msg.success_status) {
    case true:
      return {
        message: msg.message,
        data: msg.data,
        success: msg.success_status,
        doc_length: msg.doc_length,
      };

    case false:
      return {
        message: msg.message,
        error: msg.data,
        success: msg.success_status,
        stack: process.env.NODE_ENV === "development" ? msg.stack : {},
      };
    default:
      break;
  }
}
