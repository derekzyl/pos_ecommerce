"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.logout = exports.protector = exports.login = exports.verifyEmail = exports.signup = void 0;
const express_1 = require("express");
const model_auth_1 = require("./model.auth");
const crypto_1 = require("crypto");
const custom_error_1 = require("../../../utilities/custom_error");
const http_response_1 = require("../../../utilities/http_response");
const mailer_1 = __importDefault(require("../../../utilities/mailer"));
const bcrypt_1 = __importDefault(require("../../../utilities/bcrypt"));
const jwt_1 = __importDefault(require("../../../utilities/jwt"));
const response_message_1 = require("../../../utilities/response_message");
const factory_auth_1 = require("./factory.auth");
const signup = async (request, response, next) => {
    try {
        const body = request.body;
        const phone_signup = await (0, factory_auth_1.signupFactory)(request, body);
        response.status(http_response_1.HTTP_RESPONSE.CREATED).json((0, response_message_1.responseMessage)({
            message: "User created successfully kindly check your inbox to verify your email",
            data: { token: phone_signup.token },
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const verifyEmail = async (request, response, next) => {
    try {
        const { tokenReset } = request.params;
        const checker = tokenReset.split("-")[0];
        if (!tokenReset) {
            throw (0, custom_error_1.APP_ERROR)("error verifying email please try again", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (checker !== "email") {
            throw (0, custom_error_1.APP_ERROR)("error please try again", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const resetPasswordToken = (0, crypto_1.createHash)("sha256")
            .update(tokenReset)
            .digest("hex");
        const user = await model_auth_1.USER.findOne({
            token: resetPasswordToken,
        });
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("Invalid verification link", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const userX = user.token_expires;
        const d = new Date(userX);
        const da = d.getTime();
        if (da < Date.now()) {
            user.token = undefined;
            user.token_expires = undefined;
            await user.save();
            throw (0, custom_error_1.APP_ERROR)(" your link has expired", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        user.is_email_verified = true;
        user.save();
        const token = jwt_1.default.generateToken({ id: user.id }, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        response.status(200).json({
            status: "success",
            message: "email successfully verified",
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyEmail = verifyEmail;
// export const checkIsEmailVerified = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {};
const login = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        if (!email) {
            throw (0, custom_error_1.APP_ERROR)("Email is required", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (!email.includes("@")) {
            throw (0, custom_error_1.APP_ERROR)("Email is invalid", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const user = await model_auth_1.USER.findOne({ email });
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("User does not exist", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw (0, custom_error_1.APP_ERROR)("Password is incorrect", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const expire = process.env.JWT_EXPIRE || "1d";
        const token = jwt_1.default.generateToken({ id: user._id }, { expiresIn: expire });
        response.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const protector = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            throw (0, custom_error_1.APP_ERROR)("Token is required", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const tokenData = token.split(" ")[1];
        const decoded = await jwt_1.default.verifyToken(tokenData);
        if (!decoded) {
            throw (0, custom_error_1.APP_ERROR)("Token is invalid", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const user = await model_auth_1.USER.findById(decoded.id);
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("User does not exist", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (user.is_deleted) {
            throw (0, custom_error_1.APP_ERROR)("User does not exist, please kindly register   ", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        // if (!user.is_email_verified) {
        //   throw APP_ERROR("email not verified, kindly go to your mail to verify");
        // }
        request.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.protector = protector;
const logout = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            throw (0, custom_error_1.APP_ERROR)("Token is required", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const tokenData = token.split(" ")[1];
        const decoded = await jwt_1.default.verifyToken(tokenData);
        if (!decoded) {
            throw (0, custom_error_1.APP_ERROR)("Token is invalid", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const user = await model_auth_1.USER.findById(decoded.id);
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("User does not exist", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        response.status(200).json({
            message: "User logged out successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
const forgotPassword = async (request, response, next) => {
    const { email } = request.body;
    if (!email) {
        throw (0, custom_error_1.APP_ERROR)("Please provide all the required fields", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    const user = await model_auth_1.USER.findOne({
        email,
    });
    try {
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("user or email dos not exist", 401);
        }
        const pRT = "password-" + (0, crypto_1.randomBytes)(20).toString("hex");
        const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;
        const resetToken = (0, crypto_1.createHash)("sha256").update(pRT).digest("hex");
        user.token = resetToken;
        user.token_expires = new Date(resetTokenExpiry);
        await user.save();
        const url = `${request.protocol}://${request.get("host")}/api/v1/auth/resetPassword/${pRT}`;
        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. \n Please make a POST request to: ${url}`;
        const details = {
            to: `${user.email}`,
            subject: "Password reset token is valid for 1 hour",
            text: message,
        };
        const nodeMailer = new mailer_1.default();
        nodeMailer.mailer(details);
        response.status(200).json({
            status: "success",
            message: "token sent to email",
        });
    }
    catch (err) {
        // user?.resetPasswordToken = undefined;
        // user?.resetPasswordTokenExpires = undefined;
        // await USER.save();
        return next(err);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, response, next) => {
    try {
        const { tokenReset } = express_1.request.params;
        const { password, confirm_password } = express_1.request.body;
        if (!tokenReset || !password || !confirm_password) {
            throw (0, custom_error_1.APP_ERROR)("Please provide all the required fields", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (password !== confirm_password) {
            throw (0, custom_error_1.APP_ERROR)("Passwords do not match", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (password.length < 6) {
            throw (0, custom_error_1.APP_ERROR)("Password must be at least 6 characters", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (!password.match(/[a-z]/) ||
            !password.match(/[A-Z]/) ||
            !password.match(/[0-9]/) ||
            !password.match(/[!@#$%^&*]/)) {
            throw (0, custom_error_1.APP_ERROR)("Password must contain at least one lowercase letter, one uppercase letter, one number and one special character", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const resetPasswordToken = (0, crypto_1.createHash)("sha256")
            .update(tokenReset)
            .digest("hex");
        const user = await model_auth_1.USER.findOne({
            token: resetPasswordToken,
        });
        if (!user) {
            throw (0, custom_error_1.APP_ERROR)("Invalid token", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        const userX = user.token_expires;
        const d = new Date(userX);
        const da = d.getTime();
        if (da < Date.now()) {
            throw (0, custom_error_1.APP_ERROR)(" yourtoken has expired", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        user.password = await bcrypt_1.default.hash(password);
        user.token = undefined;
        user.token_expires = undefined;
        await user.save();
        const token = jwt_1.default.generateToken({ id: user.id }, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        response.status(200).json({
            status: "success",
            message: "password changed",
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.resetPassword = resetPassword;
const updatePassword = async (request, response, next) => {
    try {
        const { currentPassword, password, confirm_password } = request.body;
        if (!password || !confirm_password) {
            throw (0, custom_error_1.APP_ERROR)("Please provide all the required fields", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (password !== confirm_password) {
            throw (0, custom_error_1.APP_ERROR)("Passwords do not match", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (password.length < 6) {
            throw (0, custom_error_1.APP_ERROR)("Password must be at least 6 characters", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        if (!password.match(/[a-z]/) ||
            !password.match(/[A-Z]/) ||
            !password.match(/[0-9]/) ||
            !password.match(/[!@#$%^&*]/)) {
            throw (0, custom_error_1.APP_ERROR)("Password must contain at least one lowercase letter, one uppercase letter, one number and one special character", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        let token;
        if (request.headers.authorization &&
            request.headers.authorization.startsWith("Bearer")) {
            token = request.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next((0, custom_error_1.APP_ERROR)("You are not logged in", 401));
        }
        const decoded = jwt_1.default.verifyToken(token);
        const user = await model_auth_1.USER.findById(decoded.id);
        if (user) {
            if (!bcrypt_1.default.compare(currentPassword, user.password)) {
                throw (0, custom_error_1.APP_ERROR)("Current password is incorrect", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
            }
            user.password = await bcrypt_1.default.hash(password);
            user.password_changed_at = new Date();
            await user.save();
        }
        response.status(200).json({
            status: "success",
            message: "password changed",
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updatePassword = updatePassword;
// export const getRole = async (
//   request: RequestBody,
//   response: Response,
//   next: NextFunction
// ) => {
//   const user = request.user;
//   try {
//     if (!user) throw APP_ERROR("user not found", HTTP_RESPONSE.BAD_REQUEST);
//     const get_role_name = await ROLE.findById(user.role);
//     const gotten_role = get_role_name?.name;
//     request.role = gotten_role;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
