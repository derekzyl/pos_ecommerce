"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../general_factory/interface/general_factory");
const interface_online_1 = require("../../sales/online/interface_online/interface.online");
const notificationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    information: String,
    title: String,
    read_receipt: { type: Boolean, default: false },
    message_type: {
        type: String,
        enum: interface_online_1.MessageTypeE,
        default: interface_online_1.MessageTypeE.TEXT,
    },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER", required: true },
}, { timestamps: general_factory_1.time_stamps });
exports.NOTIFICATION = (0, mongoose_1.model)("NOTIFICATION", notificationSchema);
