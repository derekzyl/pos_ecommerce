"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHLService = void 0;
const axios_1 = __importDefault(require("axios"));
class DHLService {
    key;
    instance;
    constructor(key) {
        this.key = key ?? process.env.DHL_API_KEY;
        this.instance = this.axiosInstance();
    }
    axiosInstance() {
        const instance = axios_1.default.create({
            baseURL: "https://api-eu.dhl.com",
            timeout: 5000,
            headers: {
                "DHL-API-KEY": `${this.key}`,
                "Content-Type": "application/json",
            },
        });
        console.log(instance, "instance created");
        return instance;
    }
    async trackWithId(tracking_id) {
        const get_track = await this.instance.get(`/track/shipments?${tracking_id}`);
        return get_track;
    }
}
exports.DHLService = DHLService;
