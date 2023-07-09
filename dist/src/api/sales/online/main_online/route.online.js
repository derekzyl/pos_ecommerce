"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_online_1 = require("../index.online");
const index_auth_1 = require("../../../auth/index.auth");
const permission_handler_1 = require("../../../general_factory/permission_handler");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const onlineSalesRouter = (0, express_1.Router)();
onlineSalesRouter
    .route("/user/")
    .get(index_auth_1.AuthIndex.protector, index_online_1.OnlineSalesIndex.get_one_order_by_user)
    .post(index_auth_1.AuthIndex.protector, index_online_1.OnlineSalesIndex.create_online_sales);
onlineSalesRouter
    .route("/not-logged-in")
    .post(index_online_1.OnlineSalesIndex.check_out_sales);
onlineSalesRouter
    .route("/verify-purchase/")
    .post(index_online_1.OnlineSalesIndex.verify_online_sales);
onlineSalesRouter
    .route("/staff/accept-order-handling/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.EDIT_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.accept_order);
onlineSalesRouter
    .route("/staff/order-ready-for-dispatch/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.EDIT_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.process_order);
onlineSalesRouter
    .route("/staff/get-one-order/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.VIEW_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.get_one_order_by_staff);
onlineSalesRouter
    .route("/staff/get-many-order/")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.VIEW_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.get_many_order_by_staff);
onlineSalesRouter
    .route("/user/get-many-order/")
    .post(index_auth_1.AuthIndex.protector, index_online_1.OnlineSalesIndex.get_many_order_by_user);
onlineSalesRouter
    .route("/user/get-one-order/")
    .post(index_auth_1.AuthIndex.protector, index_online_1.OnlineSalesIndex.get_one_order_by_user);
onlineSalesRouter
    .route("/transfer-order/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.VIEW_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.transfer_order);
onlineSalesRouter
    .route("/handle-order-transfer/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.VIEW_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.handle_transfer_order);
onlineSalesRouter
    .route("/staff/get-one-order/:id")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.VIEW_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.get_one_order_by_staff);
onlineSalesRouter
    .route("/staff/update-one-order/:id")
    .patch(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER,
    general_factory_1.PermissionsE.EDIT_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.update_order_by_staff);
onlineSalesRouter
    .route("/admin/update-one-order/:id")
    .patch(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.SUPER_ADMIN]), index_online_1.OnlineSalesIndex.update_order_by_admin);
onlineSalesRouter
    .route("/admin/delete-one-order/:id")
    .delete(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([
    general_factory_1.PermissionsE.SUPER_ADMIN,
    general_factory_1.PermissionsE.DELETE_ONLINE_ORDER,
]), index_online_1.OnlineSalesIndex.delete_order_by_staff);
exports.default = onlineSalesRouter;
