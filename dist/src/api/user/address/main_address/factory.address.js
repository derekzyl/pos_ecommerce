"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressFactory = void 0;
const model_address_1 = require("./model.address");
const regex_1 = require("../../../../utilities/regex");
const custom_error_1 = require("../../../../utilities/custom_error");
async function createAddressFactory(body, user) {
    const regex_check = regex_1.phone_regex.test(body.phone);
    if (!regex_check) {
        throw (0, custom_error_1.APP_ERROR)("invalid phone number");
    }
    // find the  user address length
    const get_addresses = await model_address_1.ADDRESS.find({ user: user.id });
    if (!get_addresses || get_addresses.length < 1) {
        body.is_default = true;
    }
    const create_address = await model_address_1.ADDRESS.create({ ...body, user: user.id });
    return create_address;
}
exports.createAddressFactory = createAddressFactory;
