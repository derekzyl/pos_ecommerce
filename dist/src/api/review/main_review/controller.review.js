"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getManyReview = exports.getUserReviews = exports.getOneReview = exports.createReview = void 0;
const crud_1 = require("../../general_factory/crud");
const model_review_1 = require("./model.review");
const model_profile_1 = require("../../user/profile/main_profile/model.profile");
const custom_error_1 = require("../../../utilities/custom_error");
const http_response_1 = require("../../../utilities/http_response");
const createReview = async (request, response, next) => {
    try {
        const body = request.body;
        const find_profile = await model_profile_1.PROFILE.findOne({ user: request.user.id });
        if (!find_profile)
            throw (0, custom_error_1.APP_ERROR)("the profile isn't found", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const review_data = { ...body, profile: find_profile.id };
        const crud_review = new crud_1.Crud(request, response, next);
        crud_review.create({ model: model_review_1.REVIEW, exempt: "" }, review_data, {
            user: request.user.id,
            product: body.product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createReview = createReview;
const getOneReview = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getOne({ model: model_review_1.REVIEW, exempt: "-__v" }, { id: request.params.id }, { model: "profile", fields: "-user" });
};
exports.getOneReview = getOneReview;
const getUserReviews = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    const profile = await model_profile_1.PROFILE.findOne({ user: request.user.id });
    if (!profile)
        throw (0, custom_error_1.APP_ERROR)("i wonder why this user is'nt found in the database", http_response_1.HTTP_RESPONSE.FORBIDDEN);
    crud_review.getMany({ model: model_review_1.REVIEW, exempt: "-__v -created_at -updated_at" }, request.query, { profile: profile.id }, { model: "profile", fields: "-user" });
};
exports.getUserReviews = getUserReviews;
const getManyReview = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getMany({ model: model_review_1.REVIEW, exempt: "-__v -created_at -updated_at" }, request.query, {}, { model: "profile", fields: "-user" });
};
exports.getManyReview = getManyReview;
const updateReview = async (request, response, next) => {
    const body = {
        rating: request.body.rating,
        comment: request.body.comment,
        updated_at: Date.now,
    };
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.update({ model: model_review_1.REVIEW, exempt: "-__v" }, { ...body }, { id: request.params.id });
};
exports.updateReview = updateReview;
const deleteReview = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.delete({ model: model_review_1.REVIEW, exempt: "-__v" }, { id: request.params.id });
};
exports.deleteReview = deleteReview;
