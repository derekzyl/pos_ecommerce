"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAT = void 0;
const mongoose_1 = require("mongoose");
const interface_vat_1 = require("../interface_vat/interface.vat");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const vatSchema = new mongoose_1.Schema({
    vat_percentage: Number,
    vat_name: {
        enum: interface_vat_1.VatE,
        required: true,
        type: String,
    },
}, { timestamps: general_factory_1.time_stamps });
exports.VAT = (0, mongoose_1.model)("VAT", vatSchema);
