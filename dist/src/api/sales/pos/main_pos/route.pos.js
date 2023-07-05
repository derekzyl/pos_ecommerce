"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_pos_1 = require("../index.pos");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const posRouter = (0, express_1.Router)();
posRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.CREATE_POS), index_pos_1.PosIndex.create_pos)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.VIEW_POS), index_pos_1.PosIndex.get_all_pos);
posRouter
    .route("/products")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.VIEW_POS), index_pos_1.PosIndex.get_products);
posRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.VIEW_POS), index_pos_1.PosIndex.get_one_pos)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_POS), index_pos_1.PosIndex.update_pos)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.DELETE_POS), index_pos_1.PosIndex.delete_pos);
exports.default = posRouter;
