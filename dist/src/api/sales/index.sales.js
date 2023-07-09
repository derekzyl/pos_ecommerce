"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_pos_1 = __importDefault(require("./pos/main_pos/route.pos"));
const route_online_1 = __importDefault(require("./online/main_online/route.online"));
const salesRouter = (0, express_1.Router)();
salesRouter.use("/pos", route_pos_1.default);
salesRouter.use("/online", route_online_1.default);
exports.default = salesRouter;
