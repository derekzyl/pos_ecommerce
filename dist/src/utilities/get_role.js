"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = void 0;
const model_role_1 = require("../api/admin/role/main_role/model.role");
const response_message_1 = require("./response_message");
const http_response_1 = require("./http_response");
const custom_error_1 = require("./custom_error");
/**
 * GET THE USER ROLE
 *
 * ----------------
 *
 *
 * @param {Types.ObjectId} id please note that the object coming in must be a role id from the user model
 * @returns {(Model<RoleI> |   APP_ERROR)} a type of error if user role dosnt exist or a role model
 *
 * @example
 * ```ts
 * getRole(id: string): Model<RoleI>
 * ```
 */
const getRole = async (id) => {
    try {
        const get_role = await model_role_1.ROLE.findById(id);
        if (get_role)
            return get_role;
        else {
            throw (0, custom_error_1.APP_ERROR)("the role came with some glitches", http_response_1.HTTP_RESPONSE.NOT_IMPLEMENTED);
        }
    }
    catch (error) {
        (0, response_message_1.responseMessage)({
            message: "error from getting role",
            data: error,
            success_status: false,
        });
    }
};
exports.getRole = getRole;
