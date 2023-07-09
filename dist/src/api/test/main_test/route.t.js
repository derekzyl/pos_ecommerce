"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_auth_1 = require("../../auth/index.auth");
const index_factory_1 = require("../../general_factory/index.factory");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const index_t_1 = require("../index.t");
const middleware_file_1 = require("../../../utilities/file_handler/middleware.file");
const testRouter = (0, express_1.Router)();
testRouter
    .route("/")
    .post(middleware_file_1.multer_upload.fields([{ name: "file", maxCount: 1 }]), (0, middleware_file_1.formFileHandler)({ file: "" }, "test", false), 
// AuthIndex.protector,
// GeneralIndex.getUserPermissions(PermissionsE.CREATE_ROLE),
index_t_1.TestIndex.createTest)
    .get(
// AuthIndex.protector,
// GeneralIndex.getUserPermissions(PermissionsE.VIEW_ROLE),
index_t_1.TestIndex.getAllTest);
testRouter
    .route("/:id")
    .patch(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.EDIT_ROLE), index_t_1.TestIndex.updateTest)
    .delete(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions(general_factory_1.PermissionsE.DELETE_ROLE), index_t_1.TestIndex.deleteTest);
exports.default = testRouter;
