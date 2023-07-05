import { Types } from "mongoose";
import { ADDRESS } from "../../../user/address/main_address/model.address";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { SHIPPING } from "../../../admin/shipping/main_shipping/model.shipping";
import { n } from "../../../../utilities/number_checker";
import { MessageT, MessageTypeE } from "../interface_online/interface.online";

export const calculateAddressFee = async (
  address_id: Types.ObjectId
): Promise<number> => {
  const find_address = await ADDRESS.findById(address_id);
  if (!find_address) throw APP_ERROR("address not found");
  const get_shipping_fee = await SHIPPING.findOne({
    country: find_address.country,
  });
  if (!get_shipping_fee) throw APP_ERROR("shipping fee not found");
  let shipping_fee = 0;
  if (get_shipping_fee.use_country_shipping_fee_as_default) {
    shipping_fee = Number(get_shipping_fee.country_shipping_fee);
  } else {
    const get_state = get_shipping_fee.states.find(
      (state) => state.name === find_address.name
    );
    if (!get_state) throw APP_ERROR("state shipping fee not found");
    shipping_fee = Number(get_state.state_shipping_fee);
  }
  const nv = n(shipping_fee);
  return nv;
};

/**
 *
 * @param data  it takes information, title, message  type
 * @returns a  type of MessageT
 *
 *
 * @example
 * ```ts
 * customMessage(
 * data: Pick<MessageT, "information" | "title" | "message_type">
 * ): MessageT {
 * const { information, title, message_type } = data;
 * return {
 *    read_receipt: false,
 *   created_at: new Date(),
 *   information,
 *  title,
 *   updated_at: new Date(),
 *  message_type: message_type?? MessageTypeE.TEXT,
 *  }; ```
 */
export function customMessage(
  data: Pick<MessageT, "information" | "title" | "message_type">
): MessageT {
  const { information, title, message_type } = data;
  return {
    read_receipt: false,
    created_at: new Date(),
    information,
    title,
    updated_at: new Date(),
    message_type: message_type ?? MessageTypeE.TEXT,
  };
}
