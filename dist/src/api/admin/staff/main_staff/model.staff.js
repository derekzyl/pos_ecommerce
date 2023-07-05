"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAFF = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const staffSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
    },
    first_name: {
        type: String,
    },
    image: {
        type: String,
    },
    last_name: {
        type: String,
    },
    address: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    bank_details: {
        bank_name: String,
        account_number: Number,
        account_name: String,
    },
    branch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BRANCH",
        required: true,
    }
}, { timestamps: general_factory_1.time_stamps });
exports.STAFF = (0, mongoose_1.model)("STAFF", staffSchema);
