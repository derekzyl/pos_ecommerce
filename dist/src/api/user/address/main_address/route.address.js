"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_address_1 = require("../index.address");
const index_auth_1 = require("../../../auth/index.auth");
const index_shipping_1 = require("../../../admin/shipping/index.shipping");
const addressRouter = (0, express_1.Router)();
addressRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_address_1.AddressIndex.createAddress)
    .get(index_auth_1.AuthIndex.protector, index_address_1.AddressIndex.getAllAddress);
addressRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_address_1.AddressIndex.getOneAddress)
    .patch(index_auth_1.AuthIndex.protector, index_address_1.AddressIndex.updateAddress)
    .delete(index_auth_1.AuthIndex.protector, index_address_1.AddressIndex.deleteAddress);
addressRouter
    .route("/getCountryAndState")
    .get(index_auth_1.AuthIndex.protector, index_shipping_1.ShippingIndex.fetch_country_and_state);
exports.default = addressRouter;
