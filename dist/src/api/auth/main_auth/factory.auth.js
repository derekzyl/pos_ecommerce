"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectorFunction = exports.signupFactory = void 0;
const model_auth_1 = require("./model.auth");
const crypto_1 = require("crypto");
const custom_error_1 = require("../../../utilities/custom_error");
const http_response_1 = require("../../../utilities/http_response");
const mailer_1 = __importDefault(require("../../../utilities/mailer"));
const bcrypt_1 = __importDefault(require("../../../utilities/bcrypt"));
const jwt_1 = __importDefault(require("../../../utilities/jwt"));
const model_profile_1 = require("../../user/profile/main_profile/model.profile");
const model_wishlist_1 = require("../../user/wishlist/main_wishlist/model.wishlist");
const model_cart_1 = require("../../user/cart/main_cart/model.cart");
const regex_1 = require("../../../utilities/regex");
async function signupFactory(request, body) {
    const { email, password, confirm_password, phone } = body;
    if (!regex_1.phone_regex.test(phone))
        throw (0, custom_error_1.APP_ERROR)("invalid phone number", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    if (!email) {
        throw (0, custom_error_1.APP_ERROR)("Email is required", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    if (!regex_1.email_regex.test(email)) {
        throw (0, custom_error_1.APP_ERROR)("Email is invalid", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    const user = await model_auth_1.USER.findOne({ email });
    if (user) {
        throw (0, custom_error_1.APP_ERROR)("User already exists", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    if (!password || !confirm_password) {
        throw (0, custom_error_1.APP_ERROR)("Password is required", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    if (password !== confirm_password) {
        throw (0, custom_error_1.APP_ERROR)("Passwords do not match", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    if (password.length < 8) {
        throw (0, custom_error_1.APP_ERROR)("Password must be at least 8 characters", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    if (!regex_1.password_regex.test(password)) {
        throw (0, custom_error_1.APP_ERROR)("Password must contain at least one lowercase letter, one uppercase letter, one number and one special character", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
    }
    const encryptedPassword = await bcrypt_1.default.hash(password);
    const pRT = "email-" + (0, crypto_1.randomBytes)(20).toString("hex");
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;
    const resetToken = (0, crypto_1.createHash)("sha256").update(pRT).digest("hex");
    const token_expires = new Date(resetTokenExpiry);
    const url = `${request.protocol}://${request.get("host")}/api/v1/auth/verifyEmail/${pRT}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. \n Please make a POST request to: ${url}`;
    const details = {
        to: `${email}`,
        subject: "Password reset token is valid for 1 hour",
        text: message,
    };
    const nodeMailer = new mailer_1.default();
    nodeMailer.mailer(details);
    const newUser = new model_auth_1.USER({
        email,
        phone,
        password: encryptedPassword,
        token: resetToken,
        token_expires,
        role: "644da36acc996fe2be8239e9",
    });
    const newUSER = await newUser.save();
    const create_profile = new model_profile_1.PROFILE({
        user: newUSER.id,
        profile_image: "https://res.cloudinary.com/cybergenii/image/upload/v1688016348/Asset_2_mfttzm.png",
    });
    const create_wishlist = new model_wishlist_1.WISHLIST({
        user: newUSER.id,
        products: [],
    });
    const create_cart = new model_cart_1.CART({
        user: newUSER.id,
        total_price: 0,
        total_shipping_fee: 0,
        sub_total: 0,
        vat: 0,
        products: [],
    });
    await create_profile.save();
    await create_wishlist.save();
    await create_cart.save();
    const expire = process.env.JWT_EXPIRE || "1d";
    const token = jwt_1.default.generateToken({ id: newUSER._id }, { expiresIn: expire });
    const data = { token, newUSER };
    return {
        ...data,
    };
}
exports.signupFactory = signupFactory;
async function protectorFunction(request) {
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
    return user;
}
exports.protectorFunction = protectorFunction;
