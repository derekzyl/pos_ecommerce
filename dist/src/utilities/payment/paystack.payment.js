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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paystack = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const crypto_1 = require("crypto");
dotenv.config();
class Paystack {
    key;
    instance;
    constructor(key) {
        this.key = key ?? process.env.PAYSTACK_TEST_SECRET;
        this.instance = this.axiosInstance();
    }
    axiosInstance() {
        const instance = axios_1.default.create({
            baseURL: "https://api.paystack.co",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${this.key}`,
                "Content-Type": "application/json",
            },
        });
        console.log(instance, "instance created");
        return instance;
    }
    verifyPaystackHash(request_headers, request_body) {
        const hash = (0, crypto_1.createHmac)("sha512", this.key)
            .update(JSON.stringify(request_body))
            .digest("hex");
        if (hash == request_headers["x-paystack-signature"])
            return true;
        else
            return false;
    }
    async initialize(data) {
        const init = await this.instance.post("/transaction/initialize", {
            amount: data.amount,
            email: data.email,
            reference: data.reference,
            callback_url: data.callback_url ?? undefined,
            plan: data.plan ?? undefined,
            metadata: data.metadata ?? undefined,
            invoice_limit: data.invoice_limit ?? undefined,
            split_code: data.split_code ?? undefined,
            subaccount: data.subaccount ?? undefined,
            transaction_charge: data.transaction_charge ?? undefined,
            bearer: data.bearer ?? undefined,
        });
        return init.data;
    }
    async verifyPayment(ref_id) {
        const verify = await this.instance.get(`/transaction/verify/${ref_id}`);
        return verify.data;
    }
    async getTransactionsList() {
        const verify = await this.instance.get(`/transaction`);
        return verify.data;
    }
    async getTransactionsById(trans_id) {
        const verify = await this.instance.get(`/transaction/${trans_id}`);
        return verify.data;
    }
    async getTotalTransactionAmount() {
        const verify = await this.instance.get(`/transaction/totals`);
        return verify.data;
    }
}
exports.Paystack = Paystack;
