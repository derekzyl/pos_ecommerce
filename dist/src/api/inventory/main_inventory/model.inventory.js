"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRANCH_INVENTORY = exports.INVENTORY = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const inventorySchema = new mongoose_1.Schema({
    inventory_id: {
        type: String,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "PRODUCT",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    inventory_receipt: {
        type: String,
        required: true,
    },
}, { timestamps: general_factory_1.time_stamps });
const branchInventorySchema = new mongoose_1.Schema({
    inventory_id: {
        type: String,
        required: true,
    },
    branch: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "BRANCH",
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "PRODUCT",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    inventory_receipt: { type: String, required: true },
}, { timestamps: general_factory_1.time_stamps });
exports.INVENTORY = (0, mongoose_1.model)("INVENTORY", inventorySchema);
exports.BRANCH_INVENTORY = (0, mongoose_1.model)("BRANCH_INVENTORY", branchInventorySchema);
