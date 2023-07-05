"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMessage = exports.calculateAddressFee = void 0;
const model_address_1 = require("../../../user/address/main_address/model.address");
const custom_error_1 = require("../../../../utilities/custom_error");
const model_shipping_1 = require("../../../admin/shipping/main_shipping/model.shipping");
const number_checker_1 = require("../../../../utilities/number_checker");
const interface_online_1 = require("../interface_online/interface.online");
const calculateAddressFee = async (address_id) => {
    const find_address = await model_address_1.ADDRESS.findById(address_id);
    if (!find_address)
        throw (0, custom_error_1.APP_ERROR)("address not found");
    const get_shipping_fee = await model_shipping_1.SHIPPING.findOne({
        country: find_address.country,
    });
    if (!get_shipping_fee)
        throw (0, custom_error_1.APP_ERROR)("shipping fee not found");
    let shipping_fee = 0;
    if (get_shipping_fee.use_country_shipping_fee_as_default) {
        shipping_fee = Number(get_shipping_fee.country_shipping_fee);
    }
    else {
        const get_state = get_shipping_fee.states.find((state) => state.name === find_address.name);
        if (!get_state)
            throw (0, custom_error_1.APP_ERROR)("state shipping fee not found");
        shipping_fee = Number(get_state.state_shipping_fee);
    }
    const nv = (0, number_checker_1.n)(shipping_fee);
    return nv;
};
exports.calculateAddressFee = calculateAddressFee;
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
function customMessage(data) {
    const { information, title, message_type } = data;
    return {
        read_receipt: false,
        created_at: new Date(),
        information,
        title,
        updated_at: new Date(),
        message_type: message_type ?? interface_online_1.MessageTypeE.TEXT,
    };
}
exports.customMessage = customMessage;
