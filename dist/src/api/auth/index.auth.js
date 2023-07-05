"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthIndex = void 0;
const controller_auth_1 = require("./main_auth/controller.auth");
class Auth {
    signup = controller_auth_1.signup;
    verify_email = controller_auth_1.verifyEmail;
    login = controller_auth_1.login;
    protector = controller_auth_1.protector;
    logout = controller_auth_1.logout;
    forgot_password = controller_auth_1.forgotPassword;
    reset_password = controller_auth_1.resetPassword;
    update_password = controller_auth_1.updatePassword;
}
exports.AuthIndex = new Auth();
