"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    number_in_stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CATEGORY",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "STAFF",
        required: true,
    },
    search_tags: [
        {
            type: String,
            lowercase: true,
        },
    ],
    number_of_reviews: {
        type: Number,
    },
    sub_category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SUB_CATEGORY",
        required: true,
    },
    other_image: [String],
    weight: {
        type: Number,
        required: true,
    },
    discount_percentage: {
        type: Number,
        default: 0,
    },
    featured: Boolean,
    available: Boolean,
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "REVIEW",
        },
    ],
}, { timestamps: general_factory_1.time_stamps });
exports.PRODUCT = (0, mongoose_1.model)("PRODUCT", productSchema);
