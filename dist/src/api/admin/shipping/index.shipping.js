"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingIndex = void 0;
const controller_shipping_1 = require("./main_shipping/controller.shipping");
class Shipping {
    create_shipping = controller_shipping_1.addShippingFee;
    get_all_shipping_fee = controller_shipping_1.getAllShippingFee;
    get_one_shipping_fee = controller_shipping_1.getOneShippingFee;
    update_shipping_fee = controller_shipping_1.updateShippingFee;
    delete_shipping_fee = controller_shipping_1.deleteShippingFee;
    fetch_country_and_state = controller_shipping_1.fetchCountryAndState;
}
exports.ShippingIndex = new Shipping();
