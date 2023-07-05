"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = exports.getPermissions = void 0;
const custom_error_1 = require("../../utilities/custom_error");
const http_response_1 = require("../../utilities/http_response");
/**
 * Get Permissions
 *
 * -------------
 * @description this is a middle ware that authorizes by user permission
 *
 * @param {keyof PermissionsE} role_names this is a bunch of permissions for a  so input the role
 * @enum {(PermissionsE)} role
 * @returns {Request Response NextFunction} returns the user and throws error if the user is not authenticated
 */
const getPermissions = (role_names) => (request, response, next) => {
    const user = request.user;
    if (!user)
        throw (0, custom_error_1.APP_ERROR)("oops the user does not exist");
    if (!Array.isArray(role_names)) {
        if (user.permissions && user.permissions.includes(role_names)) {
            next();
        }
        else {
            throw (0, custom_error_1.APP_ERROR)("you are not authenticated to access this data", http_response_1.HTTP_RESPONSE.UNAUTHORIZED);
        }
    }
    else {
        const found = role_names.some((role_name) => user.permissions.includes(role_name));
        if (found)
            next();
        else
            throw (0, custom_error_1.APP_ERROR)("you are not authenticated to access this data", http_response_1.HTTP_RESPONSE.UNAUTHORIZED);
    }
};
exports.getPermissions = getPermissions;
/**
 * Check Permissions
 *
 * -------------
 * @description it returns a boolean checking if user is authorized or not
 *
 * @param { PermissionsE} role_name expects the role you want to check if the user is allowed to access
 * @param {UserI} user the logged in user object
 * @returns {boolean}  true if the user is allowed to access the permissions
 * @example ```TypeScript
 * checkPermissions(PermissionsE.EDIT_STAFF, user);
 * ```
 */
const checkPermissions = (role_name, user) => {
    if (!user)
        throw (0, custom_error_1.APP_ERROR)("oops the user does not exist");
    if (Array.isArray(role_name)) {
        const found = role_name.some((role) => user.permissions.includes(role));
        if (found)
            return true;
        else
            return false;
    }
    else {
        if (user.permissions && user.permissions.includes(role_name)) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.checkPermissions = checkPermissions;
