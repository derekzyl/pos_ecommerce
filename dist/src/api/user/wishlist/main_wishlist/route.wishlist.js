"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_wishlist_1 = require("../index.wishlist");
const index_auth_1 = require("../../../auth/index.auth");
const wishlistRouter = (0, express_1.Router)();
wishlistRouter
    .route("/")
    .get(index_auth_1.AuthIndex.protector, index_wishlist_1.WishlistIndex.get_wishlist);
wishlistRouter
    .route("/add/:id")
    .post(index_auth_1.AuthIndex.protector, index_wishlist_1.WishlistIndex.add_wishlist);
wishlistRouter
    .route("/remove/:id")
    .patch(index_auth_1.AuthIndex.protector, index_wishlist_1.WishlistIndex.remove_wishlist);
exports.default = wishlistRouter;
