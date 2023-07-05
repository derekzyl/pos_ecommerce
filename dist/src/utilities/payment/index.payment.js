"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentIndex = void 0;
const paystack_payment_1 = require("./paystack.payment");
class Payment {
    // todo list
    // 1) integrate paystack
    paystack = paystack_payment_1.Paystack;
}
exports.PaymentIndex = new Payment();
