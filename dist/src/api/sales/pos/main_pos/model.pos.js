"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POS = void 0;
const mongoose_1 = require("mongoose");
const interface_sales_1 = require("../../interface_sales/interface.sales");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const posSchema = new mongoose_1.Schema({
    order_id: { type: String },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "PRODUCT",
            },
            quantity_of_product: { type: Number, required: true },
            total: { type: Number, required: true },
        },
    ],
    server_total: {
        type: Number,
        required: true,
    },
    order_type: {
        type: String,
        enum: interface_sales_1.OrderTypeE,
        default: interface_sales_1.OrderTypeE.RETAIL,
    },
    payment_method: {
        type: String,
        enum: interface_sales_1.PaymentMethodE,
    },
    order_status: {
        type: String,
        enum: interface_sales_1.OrderStatusE,
    },
    payment_status: {
        type: String,
        enum: interface_sales_1.PaymentStatusE,
        default: interface_sales_1.PaymentStatusE.PENDING,
    },
    sold_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "STAFF",
    },
    sales_type: {
        type: String,
        enum: interface_sales_1.SalesTypeE,
    },
    branch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BRANCH",
    },
    vat: {
        type: Number,
    },
    original_amount: Number,
    discount: Number,
    total_amount: Number,
    amount_sold: Number,
    server_amount_sold: {
        type: Number,
        required: true,
    },
}, { timestamps: general_factory_1.time_stamps });
exports.POS = (0, mongoose_1.model)("POS", posSchema);
