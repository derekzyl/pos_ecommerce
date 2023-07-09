"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliderRouterF = exports.sliderRouter = exports.campaignRouterF = exports.campaignRouter = void 0;
const express_1 = require("express");
const index_campaign_1 = require("../index.campaign");
const index_auth_1 = require("../../../auth/index.auth");
const permission_handler_1 = require("../../../general_factory/permission_handler");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const middleware_file_1 = require("../../../../utilities/file_handler/middleware.file");
exports.campaignRouter = (0, express_1.Router)();
exports.campaignRouterF = (0, express_1.Router)();
exports.sliderRouter = (0, express_1.Router)();
exports.sliderRouterF = (0, express_1.Router)();
exports.campaignRouterF.route("/").get(index_campaign_1.CampaignIndex.get_all_campaign);
exports.sliderRouterF.route("/").get(index_campaign_1.CampaignIndex.get_all_slider);
exports.campaignRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, middleware_file_1.multer_upload.fields([
    { name: "image", maxCount: 1 },
]), (0, middleware_file_1.formFileHandler)({ image: "" }, "campaign", false), (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.CREATE_CAMPAIGN, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.create_campaign)
    .get(index_campaign_1.CampaignIndex.get_all_campaign);
exports.campaignRouter
    .route("/:id")
    .get(index_campaign_1.CampaignIndex.get_one_campaign)
    .patch(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.EDIT_CAMPAIGN, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.update_campaign)
    .delete(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.DELETE_CAMPAIGN, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.delete_campaign);
exports.sliderRouter
    .route("/")
    .post(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.CREATE_SLIDER, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.create_slider)
    .get(index_campaign_1.CampaignIndex.get_all_slider);
exports.sliderRouter
    .route("/:id")
    .get(index_campaign_1.CampaignIndex.get_one_slider)
    .patch(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.EDIT_SLIDER, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.update_slider)
    .delete(index_auth_1.AuthIndex.protector, (0, permission_handler_1.getPermissions)([general_factory_1.PermissionsE.DELETE_SLIDER, general_factory_1.PermissionsE.SUPER_ADMIN]), index_campaign_1.CampaignIndex.delete_slider);
