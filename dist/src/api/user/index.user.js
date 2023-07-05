"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_address_1 = __importDefault(require("./address/main_address/route.address"));
const route_profile_1 = __importDefault(require("./profile/main_profile/route.profile"));
const route_wishlist_1 = __importDefault(require("./wishlist/main_wishlist/route.wishlist"));
const dispatch_route_user_1 = __importDefault(require("./general_user_api/routes.user.ts/dispatch.route.user"));
const route_cart_1 = __importDefault(require("./cart/main_cart/route.cart"));
const userRouter = (0, express_1.Router)();
userRouter.use("/address", route_address_1.default);
userRouter.use("/profile", route_profile_1.default);
userRouter.use("/wishlist", route_wishlist_1.default);
userRouter.use("/dispatch", dispatch_route_user_1.default);
userRouter.use("/cart", route_cart_1.default);
exports.default = userRouter;
