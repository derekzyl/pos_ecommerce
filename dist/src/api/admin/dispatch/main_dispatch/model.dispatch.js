"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISPATCH = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const interface_dispatch_1 = require("../interface_dispatch/interface.dispatch");
const dispatchSchema = new mongoose_1.Schema({
    order_id: { type: String, required: true },
    tracking_id: { type: String },
    is_dispatched: { type: Boolean, default: false },
    dispatcher_has_dispatched: { type: Boolean, default: false },
    user_has_received: { type: Boolean, default: false },
    dispatched_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    dispatched_to: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    dispatch_company: {
        dispatch_company_track_id: { type: String },
        dispatch_company_name: {
            type: String,
            default: interface_dispatch_1.DispatchCompany.DHL,
            enum: interface_dispatch_1.DispatchCompany,
        },
    },
    dispatched_at: Date,
    delivery_status: {
        type: String,
        enum: interface_dispatch_1.DeliveryStatusE,
        default: interface_dispatch_1.DeliveryStatusE.PENDING,
    },
    received_at: Date,
}, { timestamps: general_factory_1.time_stamps });
exports.DISPATCH = (0, mongoose_1.model)("DISPATCH", dispatchSchema);
