"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const profileSchema = new mongoose_1.Schema({
    first_name: { type: String },
    last_name: { type: String },
    profile_image: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
}, { timestamps: general_factory_1.time_stamps });
exports.PROFILE = (0, mongoose_1.model)("PROFILE", profileSchema);
