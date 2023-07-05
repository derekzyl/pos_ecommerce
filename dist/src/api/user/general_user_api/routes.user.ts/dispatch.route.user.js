"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_dispatch_1 = require("../../../admin/dispatch/index.dispatch");
const index_auth_1 = require("../../../auth/index.auth");
const userDispatchRouter = (0, express_1.Router)();
userDispatchRouter
    .route("/")
    .get(index_auth_1.AuthIndex.protector, index_dispatch_1.DispatchIndex.get_all_dispatch_by_user);
userDispatchRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_dispatch_1.DispatchIndex.get_one_dispatch_by_user)
    .patch(index_auth_1.AuthIndex.protector, index_dispatch_1.DispatchIndex.update_dispatch_by_user);
exports.default = userDispatchRouter;
