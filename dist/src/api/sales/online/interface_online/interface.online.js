"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptanceStatusE = exports.OnlineOrderStatusE = exports.MessageTypeE = void 0;
var MessageTypeE;
(function (MessageTypeE) {
    MessageTypeE["TEXT"] = "TEXT";
    MessageTypeE["URL"] = "URL";
    MessageTypeE["IMAGE"] = "IMAGE";
    MessageTypeE["VIDEO"] = "VIDEO";
})(MessageTypeE = exports.MessageTypeE || (exports.MessageTypeE = {}));
var OnlineOrderStatusE;
(function (OnlineOrderStatusE) {
    OnlineOrderStatusE["PAYMENT_SUCCESSFUL"] = "PAYMENT_SUCCESSFUL";
    OnlineOrderStatusE["PAYMENT_FAILED"] = "PAYMENT_FAILED";
    OnlineOrderStatusE["REQUEST_PENDING"] = "REQUEST_PENDING";
    OnlineOrderStatusE["ORDER_PACKAGED"] = "ORDER_PACKAGED";
    OnlineOrderStatusE["ORDER_DISPATCHED"] = "ORDER_DISPATCHED";
    OnlineOrderStatusE["ORDER_DELIVERED"] = "ORDER_DELIVERED";
})(OnlineOrderStatusE = exports.OnlineOrderStatusE || (exports.OnlineOrderStatusE = {}));
var AcceptanceStatusE;
(function (AcceptanceStatusE) {
    AcceptanceStatusE["ACCEPTED"] = "ACCEPTED";
    AcceptanceStatusE["REJECTED"] = "REJECTED";
    AcceptanceStatusE["PENDING"] = "PENDING";
})(AcceptanceStatusE = exports.AcceptanceStatusE || (exports.AcceptanceStatusE = {}));
// export type OnlineBodyT = Pick<OnlineI,  "address"| ""  |||||||||    >
