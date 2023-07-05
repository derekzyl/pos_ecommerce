"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVIEW = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const reviewSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PROFILE",
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
    },
}, { timestamps: general_factory_1.time_stamps });
// reviewSchema.pre("findOneAndUpdate", function () {
//     this.updated_at
// })
exports.REVIEW = (0, mongoose_1.model)("REVIEW", reviewSchema);
