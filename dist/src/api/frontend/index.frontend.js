"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_campaign_1 = require("./campaigns/main_campaign/route.campaign");
const frontRouter = (0, express_1.Router)();
frontRouter.use("/campaign", route_campaign_1.campaignRouterF);
frontRouter.use("/slides", route_campaign_1.sliderRouterF);
exports.default = frontRouter;
