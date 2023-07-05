"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHIPPING = void 0;
const mongoose_1 = require("mongoose");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const shippingSchema = new mongoose_1.Schema({
    country: { type: String, required: true, uppercase: true },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
    country_shipping_fee: {
        type: Number,
        required: true,
        uppercase: true,
        unique: true,
    },
    use_country_shipping_fee_as_default: {
        type: Boolean,
        required: true,
        default: false,
    },
    states: [
        {
            name: { type: String, uppercase: true, unique: true },
            state_shipping_fee: { type: Number },
        },
    ],
}, { timestamps: general_factory_1.time_stamps });
shippingSchema.pre("save", function () {
    if (this.use_country_shipping_fee_as_default === true) {
        this.states.map((data) => {
            return { name: data.name, state_shipping_fee: this.country_shipping_fee };
        });
    }
});
exports.SHIPPING = (0, mongoose_1.model)("SHIPPING", shippingSchema);
