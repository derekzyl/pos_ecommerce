"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneRole = exports.updateOneRole = exports.getAllRole = exports.createRole = void 0;
const model_role_1 = require("./model.role");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const response_message_1 = require("../../../../utilities/response_message");
const console_1 = require("../../../../utilities/console");
const createRole = async (request, response, next) => {
    console_1.LOG.warn([
        "<---------------------------------inside role----",
        request.user,
        "---------------------->>",
    ]);
    // eslint-disable-next-line prefer-const
    let { name, permissions } = request.body;
    try {
        name = name.toUpperCase();
        const name_regex = /^[A-Z]{3,}$/g;
        if (!name_regex.test(name)) {
            throw (0, custom_error_1.APP_ERROR)("please check the role name and use another name", http_response_1.HTTP_RESPONSE.FORBIDDEN);
        }
        if (name === "ADMIN" || name === "admin") {
            throw (0, custom_error_1.APP_ERROR)("you cant add the name admin, oops", http_response_1.HTTP_RESPONSE.FORBIDDEN);
        }
        const create_role = new model_role_1.ROLE({ name, permissions });
        const role_created = await create_role.save();
        response.status(http_response_1.HTTP_RESPONSE.CREATED).json((0, response_message_1.responseMessage)({
            message: "role created successfully",
            success_status: true,
            data: role_created,
        }));
    }
    catch (error) {
        error.information = "error encountered creating role";
        next(error);
    }
};
exports.createRole = createRole;
const getAllRole = async (request, response, next) => {
    try {
        const get_all_role = await model_role_1.ROLE.find();
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "role gotten successfully",
            success_status: true,
            data: get_all_role,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllRole = getAllRole;
const updateOneRole = async (request, response, next) => {
    const { role_id } = request.params;
    const { name } = request.body;
    try {
        const get_one_role = await model_role_1.ROLE.findById({ role_id });
        if (!get_one_role)
            throw (0, custom_error_1.APP_ERROR)("the role id is not in the database", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const updated_role = await model_role_1.ROLE.findByIdAndUpdate(role_id, name);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "role created successfully",
            success_status: true,
            data: updated_role,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.updateOneRole = updateOneRole;
const deleteOneRole = async (request, response, next) => {
    const { role_id } = request.params;
    try {
        const get_one_role = await model_role_1.ROLE.findById({ role_id });
        if (!get_one_role)
            throw (0, custom_error_1.APP_ERROR)("the role id is not in the database", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const deleted_role = await model_role_1.ROLE.findByIdAndDelete(role_id);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "role created successfully",
            success_status: true,
            data: deleted_role,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOneRole = deleteOneRole;
