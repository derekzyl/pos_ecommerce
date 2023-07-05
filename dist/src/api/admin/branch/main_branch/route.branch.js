"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_branch_1 = require("../index.branch");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const branchRouter = (0, express_1.Router)();
branchRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_BRANCH,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_branch_1.BranchIndex.create_branch)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_BRANCH,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_branch_1.BranchIndex.get_all_branch);
branchRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_BRANCH,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_branch_1.BranchIndex.get_one_branch)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.EDIT_BRANCH,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_branch_1.BranchIndex.update_branch)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.DELETE_BRANCH,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_branch_1.BranchIndex.delete_branch);
exports.default = branchRouter;
