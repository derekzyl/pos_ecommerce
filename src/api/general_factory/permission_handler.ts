import { Response, NextFunction, Request } from "express";
import { PermissionsE } from "./interface/general_factory";
import { APP_ERROR } from "../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../utilities/http_response";
import { UserI } from "../auth/interface_auth/interface.auth";

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
export const getPermissions =
  (role_names: PermissionsE | PermissionsE[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    if (!user) throw APP_ERROR("oops the user does not exist");
    if (!Array.isArray(role_names)) {
      if (user.permissions && user.permissions.includes(role_names)) {
        next();
      } else {
        throw APP_ERROR(
          "you are not authenticated to access this data",
          HTTP_RESPONSE.UNAUTHORIZED
        );
      }
    } else {
      const found = role_names.some((role_name) =>
        user.permissions.includes(role_name)
      );
      if (found) next();
      else
        throw APP_ERROR(
          "you are not authenticated to access this data",
          HTTP_RESPONSE.UNAUTHORIZED
        );
    }
  };
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
export const checkPermissions = (
  role_name: PermissionsE | PermissionsE[],
  user: UserI
): boolean => {
  if (!user) throw APP_ERROR("oops the user does not exist");

  if (Array.isArray(role_name)) {
    const found = role_name.some((role) => user.permissions.includes(role));
    if (found) return true;
    else return false;
  } else {
    if (user.permissions && user.permissions.includes(role_name)) {
      return true;
    } else {
      return false;
    }
  }
};
