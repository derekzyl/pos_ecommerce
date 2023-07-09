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
const express_1 = __importDefault(require("express"));
const custom_error_1 = require("./src/utilities/custom_error");
const route_auth_1 = __importDefault(require("./src/api/auth/main_auth/route.auth"));
const index_admin_1 = __importDefault(require("./src/api/admin/index.admin"));
const route_review_1 = __importDefault(require("./src/api/review/main_review/route.review"));
const route_product_1 = __importDefault(require("./src/api/product/main_product/route.product"));
const index_sales_1 = __importDefault(require("./src/api/sales/index.sales"));
const index_user_1 = __importDefault(require("./src/api/user/index.user"));
const route_t_1 = __importDefault(require("./src/api/test/main_test/route.t"));
const route_notification_1 = __importDefault(require("./src/api/notification/main_notification/route.notification"));
const route_general_1 = __importDefault(require("./src/api/general_factory/route.general"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
const rate_limiter_1 = __importDefault(require("./src/utilities/rate_limiter"));
const compression_1 = __importDefault(require("compression"));
const index_frontend_1 = __importDefault(require("./src/api/frontend/index.frontend"));
dotenv.config();
const app = (0, express_1.default)();
// security adding and implemnentations
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
app.get("/home", (req, res) => {
    res.status(200).json({ hey: "welcome to jenny glow backend" });
});
// limit repeated failed requests to auth endpoints
if (process.env.environment === "production") {
    app.use("/api/v1/auth", rate_limiter_1.default);
}
app.use("/test", route_t_1.default);
app.use("/admin", index_admin_1.default);
app.use("/auth", route_auth_1.default);
app.use("/review", route_review_1.default);
app.use("/product", route_product_1.default);
app.use("/sales", index_sales_1.default);
app.use("/user", index_user_1.default);
app.use("/gen", route_general_1.default);
app.use("/notification", route_notification_1.default);
app.use("/fe", index_frontend_1.default);
// });
app.use(custom_error_1.errorCenter);
exports.default = app;
