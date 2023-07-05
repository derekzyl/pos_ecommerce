"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phone_regex = exports.password_regex = exports.email_regex = void 0;
exports.email_regex = /^[a-zA-Z0-9_-]{3,}@[a-zA-Z]{3,}.[a-zA-Z]{2,}$/g;
exports.password_regex = /^[a-zA-Z0-9!@#><,-_*&]{8,}$/g;
exports.phone_regex = /^[+][0-9]{9,16}$/g;
