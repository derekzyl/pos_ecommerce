"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const index_staff_1 = require("../index.staff");
const middleware_file_1 = require("../../../../utilities/file_handler/middleware.file");
const staffRouter = (0, express_1.Router)();
staffRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_STAFF,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), middleware_file_1.multer_upload.fields([{ name: "image", maxCount: 1 }]), (0, middleware_file_1.formFileHandler)({ image: "" }, "category", false), index_staff_1.StaffIndex.create_staff)
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_STAFF,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_staff_1.StaffIndex.get_all_staff);
staffRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.VIEW_STAFF,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_staff_1.StaffIndex.get_one_staff)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_STAFF), index_staff_1.StaffIndex.update_staff)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.DELETE_STAFF), index_staff_1.StaffIndex.delete_staff);
staffRouter
    .route("/me/staff/:id")
    .get(index_auth_1.AuthIndex.protector, index_staff_1.StaffIndex.get_staff_profile)
    .patch(index_auth_1.AuthIndex.protector, index_staff_1.StaffIndex.staff_update_self);
exports.default = staffRouter;
