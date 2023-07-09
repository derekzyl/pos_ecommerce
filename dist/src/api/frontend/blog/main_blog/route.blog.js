"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_file_1 = require("../../../../utilities/file_handler/middleware.file");
const index_auth_1 = require("../../../auth/index.auth");
const index_factory_1 = require("../../../general_factory/index.factory");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const index_blog_1 = require("../index.blog");
const blogRouter = (0, express_1.Router)();
blogRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([general_factory_1.PermissionsE.SUPER_ADMIN]), middleware_file_1.multer_upload.fields([
    { name: "image", maxCount: 1 },
    { name: "other_image", maxCount: 3 },
]), (0, middleware_file_1.formFileHandler)({ image: "", other_image: [] }, "blog", false), index_blog_1.BlogIndex.create_blog)
    .get(index_blog_1.BlogIndex.get_all_blog);
blogRouter
    .route("/:id")
    .get(index_blog_1.BlogIndex.get_one_blog)
    .patch(index_auth_1.AuthIndex.protector, index_blog_1.BlogIndex.update_blog)
    .delete(index_auth_1.AuthIndex.protector, index_blog_1.BlogIndex.delete_blog);
exports.default = blogRouter;
