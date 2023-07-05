"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_shipping_1 = require("../admin/shipping/index.shipping");
const generalRouter = (0, express_1.Router)();
generalRouter
    .route("/location/country-state")
    .get(index_shipping_1.ShippingIndex.fetch_country_and_state);
exports.default = generalRouter;
