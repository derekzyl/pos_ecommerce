"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchCompany = exports.DeliveryStatusE = void 0;
var DeliveryStatusE;
(function (DeliveryStatusE) {
    DeliveryStatusE["RECEIVED_BY_CUSTOMER"] = "RECEIVED_BY_CUSTOMER";
    DeliveryStatusE["DISPATCHED"] = "DISPATCHED";
    DeliveryStatusE["ON_TRANSIT"] = "ON_TRANSIT";
    DeliveryStatusE["PENDING"] = "PENDING";
    DeliveryStatusE["DELIVERED_BY_DISPATCHER"] = "DELIVERED_BY_DISPATCHER";
})(DeliveryStatusE = exports.DeliveryStatusE || (exports.DeliveryStatusE = {}));
var DispatchCompany;
(function (DispatchCompany) {
    DispatchCompany["DHL"] = "DHL";
    DispatchCompany["FEDEX"] = "FEDEX";
    DispatchCompany["OTHERS"] = "OTHERS";
})(DispatchCompany = exports.DispatchCompany || (exports.DispatchCompany = {}));
