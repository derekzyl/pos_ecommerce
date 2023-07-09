"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_campaign_1 = require("../index.campaign");
const index_auth_1 = require("../../auth/index.auth");
const notificationRouter = (0, express_1.Router)();
notificationRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, index_campaign_1.NotificationIndex.create_notification)
    .get(index_auth_1.AuthIndex.protector, index_campaign_1.NotificationIndex.get_all_notification);
notificationRouter
    .route("/:id")
    .get(index_auth_1.AuthIndex.protector, index_campaign_1.NotificationIndex.get_one_notification)
    .patch(index_auth_1.AuthIndex.protector, index_campaign_1.NotificationIndex.update_notification)
    .delete(index_auth_1.AuthIndex.protector, index_campaign_1.NotificationIndex.delete_notification);
exports.default = notificationRouter;
