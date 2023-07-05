"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_auth_1 = require("../../auth/index.auth");
const index_review_1 = require("../index.review");
const reviewRouter = (0, express_1.Router)();
reviewRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_review_1.ReviewIndex.create_review)
    .get(index_auth_1.AuthIndex.protector, index_review_1.ReviewIndex.get_all_review);
reviewRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_review_1.ReviewIndex.get_one_review)
    .patch(index_auth_1.AuthIndex.protector, index_review_1.ReviewIndex.update_review)
    .delete(index_auth_1.AuthIndex.protector, index_review_1.ReviewIndex.delete_review);
exports.default = reviewRouter;
