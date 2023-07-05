"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressIndex = void 0;
const controller_address_1 = require("./main_address/controller.address");
class Address {
    createAddress = controller_address_1.createAddress;
    getAllAddress = controller_address_1.getManyAddress;
    updateAddress = controller_address_1.updateAddress;
    deleteAddress = controller_address_1.deleteAddress;
    getOneAddress = controller_address_1.getOneAddress;
}
exports.AddressIndex = new Address();
