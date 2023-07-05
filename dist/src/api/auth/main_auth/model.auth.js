"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const general_factory_1 = require("../../general_factory/interface/general_factory");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
    phone: { type: String, required: true },
    permissions: [{ type: String, enum: general_factory_1.PermissionsE }],
    token_expires: { type: String },
    token: {
        type: String,
    },
    is_email_verified: {
        type: Boolean,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    password_changed_at: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ROLE",
        required: [true, "the user role is required"],
    },
});
exports.USER = mongoose_1.default.model("USER", UserSchema);
