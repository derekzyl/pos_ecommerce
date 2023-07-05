"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_role_1 = require("../index.role");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const roleRouter = (0, express_1.Router)();
roleRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_ROLE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_role_1.RoleIndex.createRole)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_ROLE,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_role_1.RoleIndex.getAllRole);
roleRouter
    .route("/:id")
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_ROLE), index_role_1.RoleIndex.updateRole)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.DELETE_ROLE), index_role_1.RoleIndex.deleteRole);
exports.default = roleRouter;
