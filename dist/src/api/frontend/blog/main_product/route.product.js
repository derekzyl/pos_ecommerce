"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_auth_1 = require("../../auth/index.auth");
const index_product_1 = require("../index.product");
const index_factory_1 = require("../../general_factory/index.factory");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const middleware_file_1 = require("../../../utilities/file_handler/middleware.file");
const productRouter = (0, express_1.Router)();
productRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_factory_1.GeneralIndex.getUserPermissions([
    general_factory_1.PermissionsE.CREATE_PRODUCT,
    general_factory_1.PermissionsE.SUPER_ADMIN,
]), middleware_file_1.multer_upload.fields([
    { name: "image", maxCount: 1 },
    { name: "other_image", maxCount: 3 },
]), (0, middleware_file_1.formFileHandler)({ image: "", other_image: [] }, "product", false), index_product_1.ProductIndex.create_product)
    .get(index_product_1.ProductIndex.get_all_product);
productRouter
    .route("/:id")
    .get(index_product_1.ProductIndex.get_one_product)
    .patch(index_auth_1.AuthIndex.protector, index_product_1.ProductIndex.update_product)
    .delete(index_auth_1.AuthIndex.protector, index_product_1.ProductIndex.delete_product);
exports.default = productRouter;
