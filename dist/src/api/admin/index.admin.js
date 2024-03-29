"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_branch_1 = __importDefault(require("./branch/main_branch/route.branch"));
const route_role_1 = __importDefault(require("./role/main_role/route.role"));
const route_staff_1 = __importDefault(require("./staff/main_staff/route.staff"));
const route_category_1 = require("./category/main_category/route.category");
const route_vat_1 = __importDefault(require("./vat/main_vat/route.vat"));
const route_role_2 = __importDefault(require("./shipping/main_shipping/route.role"));
const route_dispatch_1 = __importDefault(require("./dispatch/main_dispatch/route.dispatch"));
const route_campaign_1 = require("../frontend/campaigns/main_campaign/route.campaign");
const adminRouter = (0, express_1.Router)();
adminRouter.use("/branch", route_branch_1.default);
adminRouter.use("/role", route_role_1.default);
adminRouter.use("/staff", route_staff_1.default);
adminRouter.use("/category", route_category_1.categoryRouter);
adminRouter.use("/sub-category", route_category_1.subCategoryRouter);
adminRouter.use("/vat", route_vat_1.default);
adminRouter.use("/shipping", route_role_2.default);
adminRouter.use("/dispatch", route_dispatch_1.default);
adminRouter.use("/campaign", route_campaign_1.campaignRouter);
adminRouter.use("/slider", route_campaign_1.sliderRouter);
exports.default = adminRouter;
