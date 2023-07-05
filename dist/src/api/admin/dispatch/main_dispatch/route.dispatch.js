"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const index_dispatch_1 = require("../index.dispatch");
const dispatchRouter = (0, express_1.Router)();
dispatchRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.CREATE_DISPATCH), index_dispatch_1.DispatchIndex.create_dispatch)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.VIEW_DISPATCH), index_dispatch_1.DispatchIndex.get_all_dispatch_by_staff);
dispatchRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_DISPATCH), index_dispatch_1.DispatchIndex.get_one_dispatch_by_staff)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_DISPATCH), index_dispatch_1.DispatchIndex.update_dispatch_by_dispatcher)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.DELETE_DISPATCH), index_dispatch_1.DispatchIndex.delete_dispatch);
exports.default = dispatchRouter;
