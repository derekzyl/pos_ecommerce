"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_cart_1 = require("../index.cart");
const index_auth_1 = require("../../../auth/index.auth");
const cartRouter = (0, express_1.Router)();
cartRouter
    .route("/")
    .get(index_auth_1.AuthIndex.protector, index_cart_1.CartIndex.get_cart);
cartRouter.route("/add/:id").patch(index_auth_1.AuthIndex.protector, index_cart_1.CartIndex.add_cart);
cartRouter
    .route("/remove/:id")
    .delete(index_auth_1.AuthIndex.protector, index_cart_1.CartIndex.remove_cart);
cartRouter
    .route("/update-cart-with-address/:id")
    .patch(index_auth_1.AuthIndex.protector, index_cart_1.CartIndex.update_cart_with_address);
cartRouter
    .route("/clear/cart")
    .delete(index_auth_1.AuthIndex.protector, index_cart_1.CartIndex.clear_cart);
exports.default = cartRouter;
