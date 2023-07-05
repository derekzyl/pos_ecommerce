"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_vat_1 = require("../index.vat");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const vatRouter = (0, express_1.Router)();
vatRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_VAT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_vat_1.VatIndex.create_vat)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_VAT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_vat_1.VatIndex.get_all_vat);
vatRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_VAT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_vat_1.VatIndex.get_one_vat)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.EDIT_VAT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_vat_1.VatIndex.update_vat)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.DELETE_VAT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_vat_1.VatIndex.delete_vat);
exports.default = vatRouter;
