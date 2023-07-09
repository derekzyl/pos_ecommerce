"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAMPAIGN = exports.SLIDER = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const campaignSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "PRODUCT" },
    is_active: { type: Boolean, default: false },
}, { timestamps: general_factory_1.time_stamps });
exports.SLIDER = (0, mongoose_1.model)("SLIDER", campaignSchema);
const sliderSchema = new mongoose_1.Schema({
    image: String,
    is_active: { type: Boolean, default: false },
    name: { type: String },
    information: { type: String },
}, { timestamps: general_factory_1.time_stamps });
exports.CAMPAIGN = (0, mongoose_1.model)("CAMPAIGN", sliderSchema);
