"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_shipping_1 = require("../index.shipping");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const shippingRouter = (0, express_1.Router)();
shippingRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_SHIPPING_FEE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_shipping_1.ShippingIndex.create_shipping)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_SHIPPING_FEE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_shipping_1.ShippingIndex.get_all_shipping_fee);
shippingRouter
    .route("/:id")
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.EDIT_SHIPPING_FEE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_shipping_1.ShippingIndex.update_shipping_fee)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.DELETE_SHIPPING_FEE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_shipping_1.ShippingIndex.delete_shipping_fee)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_SHIPPING_FEE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_shipping_1.ShippingIndex.get_one_shipping_fee);
exports.default = shippingRouter;
