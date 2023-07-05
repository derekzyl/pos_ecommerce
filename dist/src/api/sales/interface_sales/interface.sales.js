"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodE = exports.PaymentStatusE = exports.OrderTypeE = exports.SalesTypeE = exports.OrderStatusE = void 0;
var OrderStatusE;
(function (OrderStatusE) {
    OrderStatusE["SUCCESS"] = "SUCCESS";
    OrderStatusE["PENDING"] = "PENDING";
    OrderStatusE["FAILED"] = "FAILED";
})(OrderStatusE = exports.OrderStatusE || (exports.OrderStatusE = {}));
var SalesTypeE;
(function (SalesTypeE) {
    SalesTypeE["ONLINE_SALES"] = "ONLINE_SALES";
    SalesTypeE["STORE_SALES"] = "STORE_SALES";
})(SalesTypeE = exports.SalesTypeE || (exports.SalesTypeE = {}));
var OrderTypeE;
(function (OrderTypeE) {
    OrderTypeE["WHOLESALE"] = "WHOLE_SALE";
    OrderTypeE["RETAIL"] = "RETAIL";
})(OrderTypeE = exports.OrderTypeE || (exports.OrderTypeE = {}));
var PaymentStatusE;
(function (PaymentStatusE) {
    PaymentStatusE["APPROVED"] = "APPROVED";
    PaymentStatusE["PENDING"] = "PENDING";
    PaymentStatusE["PROCESSING"] = "PROCESSING";
    PaymentStatusE["DISPUTE"] = "DISPUTE";
    PaymentStatusE["DECLINED"] = "DECLINED";
    PaymentStatusE["INITIALIZED"] = "INITIALIZED";
})(PaymentStatusE = exports.PaymentStatusE || (exports.PaymentStatusE = {}));
var PaymentMethodE;
(function (PaymentMethodE) {
    PaymentMethodE["CASH"] = "CASH";
    PaymentMethodE["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethodE["PAYPAL"] = "PAYPAL";
    PaymentMethodE["PAYONEER"] = "PAYONEER";
    PaymentMethodE["BANK_TRANSFERS"] = "BANK_TRANSFERS";
    PaymentMethodE["USSD"] = "USSD";
    PaymentMethodE["POS"] = "POS";
})(PaymentMethodE = exports.PaymentMethodE || (exports.PaymentMethodE = {}));
