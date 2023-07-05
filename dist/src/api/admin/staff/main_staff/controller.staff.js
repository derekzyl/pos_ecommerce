"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.getAllStaff = exports.getOneStaff = exports.getMyStaffProfile = exports.staffUpdateSelf = exports.adminUpdateStaff = exports.createStaff = void 0;
const index_factory_1 = require("../../../general_factory/index.factory");
const model_staff_1 = require("./model.staff");
const model_auth_1 = require("../../../auth/main_auth/model.auth");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("../../../../utilities/bcrypt"));
const mailer_1 = __importDefault(require("../../../../utilities/mailer"));
const get_role_1 = require("../../../../utilities/get_role");
const response_message_1 = require("../../../../utilities/response_message");
const regex_1 = require("../../../../utilities/regex");
const createStaff = async (request, response, next) => {
    const staff_body = request.body;
    let role;
    const get_role = await (0, get_role_1.getRole)(staff_body.role);
    if (get_role)
        role = get_role;
    try {
        const pRT = "email-" + (0, crypto_1.randomBytes)(20).toString("hex");
        const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;
        const resetToken = (0, crypto_1.createHash)("sha256").update(pRT).digest("hex");
        const token_expires = new Date(resetTokenExpiry);
        if (!regex_1.email_regex.test(staff_body.email))
            throw (0, custom_error_1.APP_ERROR)("the email is not a valid one", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        if (!regex_1.password_regex.test(staff_body.password))
            throw (0, custom_error_1.APP_ERROR)("password is not a valid one", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        if (!regex_1.phone_regex.test(staff_body.phone))
            throw (0, custom_error_1.APP_ERROR)("invalid phone number", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const check_if_user_exist = await model_auth_1.USER.findOne({ email: staff_body.email });
        // if(check_if_email_exist){
        //     const check_user_role =
        //         await getRole(check_if_email_exist.role!)
        // }
        let get_user;
        if (check_if_user_exist) {
            const check_user_role = await (0, get_role_1.getRole)(check_if_user_exist.role);
            if (check_user_role && check_user_role.name !== "USER")
                throw (0, custom_error_1.APP_ERROR)("user is already a staff kindly change the user role");
            let roless = check_if_user_exist.permissions.concat(role.permissions);
            roless = roless.concat(staff_body.permissions);
            get_user = await model_auth_1.USER.findByIdAndUpdate(check_if_user_exist.id, {
                permissions: roless,
                role: staff_body.role,
                phone: staff_body.phone ?? check_if_user_exist.phone,
            });
        }
        else {
            if (!staff_body.password)
                throw (0, custom_error_1.APP_ERROR)("insert a password");
            const password = await bcrypt_1.default.hash(staff_body.password);
            const create_user = new model_auth_1.USER({
                email: staff_body.email,
                password,
                token: resetToken,
                token_expires,
                permissions: role?.permissions.concat(staff_body.permissions),
                role: staff_body.role,
                phone: staff_body.phone,
            });
            get_user = await create_user.save();
            const url = ` ${request.protocol}://${request.get("host")}/api/v1/auth/verifyEmail/${pRT}`;
            const message = `You are receiving this email because you (or someone else) have requested the reset of a password. \n Please make a POST request to: ${url}`;
            const details = {
                to: `${staff_body.email}`,
                subject: "Password reset token is valid for 1 hour",
                text: message,
            };
            const nodeMailer = new mailer_1.default();
            nodeMailer.mailer(details);
        }
        const create_staff = new model_staff_1.STAFF({
            user: get_user?.id,
            first_name: staff_body.first_name,
            last_name: staff_body.last_name,
            address: staff_body.address,
            branch: staff_body.branch,
            bank_details: staff_body.bank_details,
            username: staff_body.username,
            image: staff_body.image,
        });
        const staff_created = await create_staff.save();
        response.status(http_response_1.HTTP_RESPONSE.CREATED).json((0, response_message_1.responseMessage)({
            data: {
                full_name: {
                    first_name: staff_created.first_name,
                    last_name: staff_created.last_name,
                },
            },
            message: "staff created successfully",
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.createStaff = createStaff;
const adminUpdateStaff = async (request, response, next) => {
    try {
        const user = request.user;
        const update_body = request.body;
        const { id } = request.params;
        const admin_find_staff = await model_staff_1.STAFF.findById(id);
        if (!admin_find_staff)
            throw (0, custom_error_1.APP_ERROR)("the staff does'nt exist in the data base ");
        const find_staff_user_model_by_admin = await model_auth_1.USER.findById(admin_find_staff?.user.id);
        const update_user = await model_auth_1.USER.findByIdAndUpdate(find_staff_user_model_by_admin?.id, {
            role: update_body.role ?? find_staff_user_model_by_admin?.role,
            permissions: update_body.permissions ??
                find_staff_user_model_by_admin?.permissions,
            phone: update_body.phone ?? find_staff_user_model_by_admin?.phone,
            updated_at: Date.now(),
        });
        const update_staff_data = await model_staff_1.STAFF.findByIdAndUpdate(id, {
            first_name: update_body.first_name ?? admin_find_staff?.first_name,
            last_name: update_body.last_name ?? admin_find_staff?.last_name,
            address: update_body.address ?? admin_find_staff?.address,
            branch: update_body.branch ?? admin_find_staff?.branch,
            bank_details: {
                bank_name: update_body.bank_details?.bank_name ??
                    admin_find_staff?.bank_details?.bank_name,
                account_name: update_body.bank_details?.account_name ??
                    admin_find_staff?.bank_details?.account_name,
                account_number: update_body.bank_details?.account_number ??
                    admin_find_staff?.bank_details?.account_number,
            },
        });
        if (!update_staff_data || !update_user)
            throw (0, custom_error_1.APP_ERROR)("error updating staff", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "update successful",
            data: admin_find_staff?.first_name,
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.adminUpdateStaff = adminUpdateStaff;
const staffUpdateSelf = async (request, response, next) => {
    try {
        const user = request.user;
        const update_body = request.body;
        const staff_find_self = await model_staff_1.STAFF.findOne({ user: request.user.id });
        if (user.id === staff_find_self?.user.id) {
            const update_user = await model_auth_1.USER.findByIdAndUpdate(request.user?.id, {
                phone: update_body.phone ?? user.phone,
            });
            const update_staff_data = await model_staff_1.STAFF.findOneAndUpdate({ user: request.user.id }, {
                bank_details: {
                    bank_name: update_body.bank_details?.bank_name,
                    account_name: update_body.bank_details?.account_name,
                    account_number: update_body.bank_details?.account_number,
                },
                updated_at: Date.now(),
            });
            if (!update_staff_data || update_user)
                throw (0, custom_error_1.APP_ERROR)("error updating staff", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        }
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "update successful",
            data: staff_find_self?.first_name,
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.staffUpdateSelf = staffUpdateSelf;
const getMyStaffProfile = async (request, response, next) => {
    try {
        const findStaff = await model_staff_1.STAFF.findOne({ user: request.user.id })
            .select("-user -created_at -updated_at")
            .populate({ path: "branch", select: "name created_at updated_at _id" });
        if (!findStaff)
            throw (0, custom_error_1.APP_ERROR)("staff does not exist in database", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            message: "get staff profile successful",
            data: findStaff,
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.getMyStaffProfile = getMyStaffProfile;
exports.getOneStaff = index_factory_1.GeneralIndex.getOneFactory(model_staff_1.STAFF);
exports.getAllStaff = index_factory_1.GeneralIndex.getAllFactory(model_staff_1.STAFF);
exports.deleteStaff = index_factory_1.GeneralIndex.deleteOneFactory(model_staff_1.STAFF);
