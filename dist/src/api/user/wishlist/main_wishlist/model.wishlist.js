"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WISHLIST = void 0;
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "PRODUCT" }],
});
exports.WISHLIST = (0, mongoose_1.model)("WISHLIST", wishlistSchema);
