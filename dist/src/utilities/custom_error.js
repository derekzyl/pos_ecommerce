"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCenter = exports.APP_ERROR = void 0;
const console_1 = require("./console");
const http_response_1 = require("./http_response");
const response_message_1 = require("./response_message");
class AppError extends Error {
    statusCode;
    constructor(message, status) {
        super(message);
        //lets do some mongodb error management
        // if (message?.includes("E11000")) {
        //   this.message = "the data already exist in the database kindly check";
        // }
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = new Error().stack;
        if (message) {
            this.message = message;
        }
        else {
            this.message = "Something went wrong";
        }
        if (status) {
            this.statusCode = status;
        }
        else {
            this.statusCode = http_response_1.HTTP_RESPONSE.INTERNAL_SERVER_ERROR;
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
function APP_ERROR(message, status) {
    const my_error = new AppError(message, status);
    return my_error;
}
exports.APP_ERROR = APP_ERROR;
const errorCenter = (error, request, response, next) => {
    const error_status = error.statusCode ?? 500;
    let error_message = error.message;
    console_1.LOG.log(error.stack);
    //mongodb error
    if (error_message.includes("E11000")) {
        error_message = "data already exist in the database";
    }
    const error_info = error.information;
    response
        .status(error_status)
        .json((0, response_message_1.responseMessage)({
        message: error_info,
        success_status: false,
        data: error_message,
        stack: error.stack,
    }));
};
exports.errorCenter = errorCenter;
