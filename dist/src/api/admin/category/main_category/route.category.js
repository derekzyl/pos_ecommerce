"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = exports.subCategoryRouter = void 0;
const express_1 = require("express");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const index_category_1 = require("../index.category");
const middleware_file_1 = require("../../../../utilities/file_handler/middleware.file");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
const subCategoryRouter = (0, express_1.Router)();
exports.subCategoryRouter = subCategoryRouter;
categoryRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), middleware_file_1.multer_upload.fields([{ name: "image", maxCount: 1 }]), (0, middleware_file_1.formFileHandler)({ image: "" }, "category", false), index_category_1.CategoryIndex.create_category)
    .get(index_category_1.CategoryIndex.get_all_category);
categoryRouter
    .route("/:id")
    .get(index_category_1.CategoryIndex.get_one_category)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.EDIT_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_category_1.CategoryIndex.update_category)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.DELETE_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_category_1.CategoryIndex.delete_category);
subCategoryRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), middleware_file_1.multer_upload.fields([{ name: "image", maxCount: 1 }]), (0, middleware_file_1.formFileHandler)({ image: "" }, "category", false), index_category_1.SubCategoryIndex.create_sub_category)
    .get(index_category_1.SubCategoryIndex.get_all_sub_category);
subCategoryRouter
    .route("/:id")
    .get(index_category_1.SubCategoryIndex.get_one_sub_category)
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.EDIT_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), middleware_file_1.multer_upload.fields([{ name: "image", maxCount: 1 }]), (0, middleware_file_1.formFileHandler)({ image: "" }, "category", false), index_category_1.SubCategoryIndex.update_sub_category)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.DELETE_CATEGORY,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), index_category_1.SubCategoryIndex.delete_sub_category);
