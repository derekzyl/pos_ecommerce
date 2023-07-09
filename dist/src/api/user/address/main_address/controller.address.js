"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getManyAddress = exports.getOneAddress = exports.createAddress = void 0;
const model_address_1 = require("./model.address");
const crud_1 = require("../../../general_factory/crud");
const permission_handler_1 = require("../../../general_factory/permission_handler");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const regex_1 = require("../../../../utilities/regex");
const custom_error_1 = require("../../../../utilities/custom_error");
const createAddress = async (request, response, next) => {
    try {
        const user = request.user;
        const body = request.body;
        const regex_check = regex_1.phone_regex.test(body.phone);
        if (!regex_check) {
            throw (0, custom_error_1.APP_ERROR)("invalid phone number");
        }
        // find the  user address length
        const get_addresses = await model_address_1.ADDRESS.find({ user: request.user.id });
        if (!get_addresses || get_addresses.length < 1) {
            body.is_default = true;
        }
        const crud_address = new crud_1.Crud(request, response, next);
        crud_address.create({ model: model_address_1.ADDRESS, exempt: "" }, { ...body, user: user.id }, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createAddress = createAddress;
const getOneAddress = async (request, response, next) => {
    const check_user_clearance = (0, permission_handler_1.checkPermissions)(general_factory_1.PermissionsE.VIEW_USER_PROFILE, request.user);
    const user = check_user_clearance ? undefined : request.user.id;
    const crud_address = new crud_1.Crud(request, response, next);
    crud_address.getOne({ model: model_address_1.ADDRESS, exempt: "-__v -user " }, { _id: request.params.id, user }, {});
};
exports.getOneAddress = getOneAddress;
const getManyAddress = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getMany({ model: model_address_1.ADDRESS, exempt: "-__v, -user " }, request.query, {}, {});
};
exports.getManyAddress = getManyAddress;
const updateAddress = async (request, response, next) => {
    const body = request.body;
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.update({ model: model_address_1.ADDRESS, exempt: "-__v" }, { ...body }, { _id: request.params.id });
};
exports.updateAddress = updateAddress;
const deleteAddress = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.delete({ model: model_address_1.ADDRESS, exempt: "-__v -created_at -updated_at" }, { _id: request.params.id });
};
exports.deleteAddress = deleteAddress;
