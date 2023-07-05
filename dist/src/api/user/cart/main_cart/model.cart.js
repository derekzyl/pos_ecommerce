"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CART = exports.CART_ITEM = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "CART_ITEM" }],
    sub_total: { type: Number },
    total_shipping_fee: { type: Number },
    vat: { type: Number },
    total_price: { type: Number },
}, { timestamps: general_factory_1.time_stamps });
const cartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "PRODUCT", required: true },
    cart_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "CART", required: true },
    product_total_count: Number,
    product_total_price: Number,
    shipping_fee: Number,
});
exports.CART_ITEM = (0, mongoose_1.model)("CART_ITEM", cartItemSchema);
exports.CART = (0, mongoose_1.model)("CART", cartSchema);
