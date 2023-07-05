"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getManyProfile = exports.getOneProfile = exports.createProfile = void 0;
const model_profile_1 = require("./model.profile");
const crud_1 = require("../../../general_factory/crud");
const get_role_1 = require("../../../../utilities/get_role");
const permission_handler_1 = require("../../../general_factory/permission_handler");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const http_response_1 = require("../../../../utilities/http_response");
const response_message_1 = require("../../../../utilities/response_message");
//todo profile receipt
const createProfile = async (request, response, next) => {
    try {
        // const user = request.user;
        const body = request.body;
        const crud_profile = new crud_1.Crud(request, response, next);
        crud_profile.create({ model: model_profile_1.PROFILE, exempt: "" }, { ...body, user: body.user_id }, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createProfile = createProfile;
const getOneProfile = async (request, response, next) => {
    try {
        const get_role = await (0, get_role_1.getRole)(request.user.id);
        let profile;
        const user = request.user;
        if (get_role && get_role.name === "USER") {
            profile = await model_profile_1.PROFILE.findOne({
                user,
            }).select("-__v id");
        }
        else if (request.params.id &&
            (0, permission_handler_1.checkPermissions)(general_factory_1.PermissionsE.VIEW_USER_PROFILE, user)) {
            profile = await model_profile_1.PROFILE.findById(request.params.id);
        }
        profile = profile?.populate("user", "phone");
        return response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: profile,
            message: "fetched successfully",
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.getOneProfile = getOneProfile;
const getManyProfile = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getMany({ model: model_profile_1.PROFILE, exempt: "-__v, -user " }, request.query, {}, {});
};
exports.getManyProfile = getManyProfile;
const updateProfile = async (request, response, next) => {
    const body = request.body;
    const check_permissions = (0, permission_handler_1.checkPermissions)(general_factory_1.PermissionsE.EDIT_USER_PROFILE, request.user.id);
    const data = {
        user: check_permissions ? null : request.user.id,
        id: check_permissions ? request.params.id : null,
    };
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.update({ model: model_profile_1.PROFILE, exempt: "-__v -user" }, { ...body }, data);
};
exports.updateProfile = updateProfile;
const deleteProfile = async (request, response, next) => {
    const check_permissions = (0, permission_handler_1.checkPermissions)(general_factory_1.PermissionsE.DELETE_USER_PROFILE, request.user.id);
    const data = {
        user: check_permissions ? undefined : request.user.id,
        id: check_permissions ? request.params.id : undefined,
    };
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.delete({ model: model_profile_1.PROFILE, exempt: "-__v -created_at -updated_at" }, data);
};
exports.deleteProfile = deleteProfile;
