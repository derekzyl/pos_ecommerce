"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONLINE_ORDER = exports.onlineSchema = void 0;
const mongoose_1 = require("mongoose");
const interface_online_1 = require("../interface_online/interface.online");
const interface_sales_1 = require("../../interface_sales/interface.sales");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
exports.onlineSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    order_id: { type: String, required: true, unique: true },
    order_status: {
        type: String,
        enum: interface_online_1.OnlineOrderStatusE,
        default: interface_online_1.OnlineOrderStatusE.REQUEST_PENDING,
    },
    transfer_handling: [
        {
            to: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "USER",
            },
            from: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "USER",
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            acceptance_status: {
                type: String,
                enum: interface_online_1.AcceptanceStatusE,
                default: interface_online_1.AcceptanceStatusE.PENDING,
            },
        },
    ],
    handled_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "USER",
    },
    is_being_handled: { type: Boolean, default: false },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "PRODUCT",
            },
            product_total_count: { type: Number },
            product_total_price: { type: Number },
            shipping_fee: { type: Number },
        },
    ],
    branch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BRANCH",
    },
    order_type: {
        type: String,
        enum: interface_sales_1.OrderTypeE,
        default: interface_sales_1.OrderTypeE.RETAIL,
    },
    payment_method: {
        type: String,
        enum: interface_sales_1.PaymentMethodE,
        default: interface_sales_1.PaymentMethodE.CREDIT_CARD,
    },
    payment_status: {
        type: String,
        enum: interface_sales_1.PaymentStatusE,
        default: interface_sales_1.PaymentStatusE.INITIALIZED,
    },
    sold_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "USER",
    },
    sales_type: {
        type: String,
        enum: interface_sales_1.SalesTypeE,
        default: interface_sales_1.SalesTypeE.ONLINE_SALES,
    },
    date_ordered: Date,
    vat: { type: Number },
    discount: { type: Number },
    total_amount: { type: Number },
    original_amount: { type: Number },
    amount_sold: { type: Number },
    server_amount_sold: { type: Number },
    server_total: { type: Number },
    is_ready_for_dispatch: Boolean,
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ADDRESS",
        required: true,
    },
    updated_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    message: [
        {
            title: { type: String },
            text: { type: String },
            created_at: { type: Date },
            updated_at: { type: Date },
            read_receipt: { type: Boolean, default: false },
            message_type: {
                type: String,
                enum: interface_online_1.MessageTypeE,
                default: interface_online_1.MessageTypeE.TEXT,
            },
        },
    ],
    dispatch: { type: mongoose_1.Schema.Types.ObjectId, ref: "DISPATCH" },
}, { timestamps: general_factory_1.time_stamps });
exports.ONLINE_ORDER = (0, mongoose_1.model)("ONLINE_ORDER", exports.onlineSchema);
