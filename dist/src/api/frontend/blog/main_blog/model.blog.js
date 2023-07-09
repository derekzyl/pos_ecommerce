"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOG = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    image: {
        type: String,
    },
    remarks: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "PROFILE" },
            upvote: { type: Boolean },
            downvote: { type: Boolean },
            comment: { type: String },
        },
    ],
    creator_name: String,
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
}, { timestamps: general_factory_1.time_stamps });
exports.BLOG = (0, mongoose_1.model)("BLOG", blogSchema);
