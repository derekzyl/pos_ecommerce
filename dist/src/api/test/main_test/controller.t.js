"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTest = exports.updateOneTest = exports.getAllTest = exports.createTest = void 0;
const custom_error_1 = require("../../../utilities/custom_error");
const http_response_1 = require("../../../utilities/http_response");
const response_message_1 = require("../../../utilities/response_message");
const model_role_1 = require("../../admin/role/main_role/model.role");
const index_payment_1 = require("../../../utilities/payment/index.payment");
const id_generator_1 = require("../../../utilities/id_generator");
const id_gen_interface_1 = require("../../../utilities/interface_utilities/id_gen.interface");
const files_handler_1 = require("../../../utilities/file_handler/files_handler");
const createTest = async (request, response, next) => {
    // eslint-disable-next-line prefer-const
    console.log("<---------request body file", request.body.file, "-------------------------------->");
    if (request.body.file) {
        (0, files_handler_1.imageDeleteHandler)(request.body.file);
    }
    console.log("<---------request body game", request.body.game);
    const fg = (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.WEB_SALES);
    console.log(fg);
    try {
        const paystack_data = {
            email: "derekzyl@gmail.com",
            amount: 400 * 100,
            reference: fg,
        };
        // const paystack = PaymentIndex.paystack;
        // const pay = new paystack();
        // const init_pay = await pay.initialize(paystack_data);
        return response.json({ url: "init_pay.data.authorization_url " });
        // return response.json({ url: init_pay.data.authorization_url });
    }
    catch (error) {
        error.information = "error encountered creating test";
        next(error);
    }
};
exports.createTest = createTest;
// WEB_15062023603_43036_42588
const getAllTest = async (request, response, next) => {
    try {
        const paystack = index_payment_1.PaymentIndex.paystack;
        const pay = new paystack();
        const v = await pay.verifyPayment("WEB_16062023312_23123_87412");
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "test gotten successfully",
            success_status: true,
            data: v,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTest = getAllTest;
const updateOneTest = async (request, response, next) => {
    const { test_id } = request.params;
    const { name } = request.body;
    try {
        const get_one_test = await model_role_1.ROLE.findById({ test_id });
        if (!get_one_test)
            throw (0, custom_error_1.APP_ERROR)("the test id is not in the database", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const updated_test = await model_role_1.ROLE.findByIdAndUpdate(test_id, name);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "test created successfully",
            success_status: true,
            data: updated_test,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.updateOneTest = updateOneTest;
const deleteOneTest = async (request, response, next) => {
    const { test_id } = request.params;
    try {
        const get_one_test = await model_role_1.ROLE.findById({ test_id });
        if (!get_one_test)
            throw (0, custom_error_1.APP_ERROR)("the test id is not in the database", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const deleted_test = await model_role_1.ROLE.findByIdAndDelete(test_id);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "test created successfully",
            success_status: true,
            data: deleted_test,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOneTest = deleteOneTest;
