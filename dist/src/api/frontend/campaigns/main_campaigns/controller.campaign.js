"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.updateCampaign = exports.getManyCampaign = exports.getOneCampaign = exports.createCampaign = exports.deleteSlider = exports.updateSlider = exports.getManySlider = exports.getOneSlider = exports.createSlider = void 0;
const model_campaign_1 = require("./model.campaign");
const crud_1 = require("../../../general_factory/crud");
const custom_error_1 = require("../../../../utilities/custom_error");
const files_handler_1 = require("../../../../utilities/file_handler/files_handler");
const createSlider = async (request, response, next) => {
    try {
        const body = request.body;
        const gotten_body = { ...body };
        const crud_slider = new crud_1.Crud(request, response, next);
        crud_slider.create({ model: model_campaign_1.SLIDER, exempt: "" }, gotten_body, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createSlider = createSlider;
const getOneSlider = async (request, response, next) => {
    const crud_slider = new crud_1.Crud(request, response, next);
    crud_slider.getOne({ model: model_campaign_1.SLIDER, exempt: "-__v -created_at updated_at -is_active" }, { _id: request.params.id }, { model: "product", fields: "-reviews" });
};
exports.getOneSlider = getOneSlider;
const getManySlider = async (request, response, next) => {
    const crud_slider = new crud_1.Crud(request, response, next);
    crud_slider.getMany({ model: model_campaign_1.SLIDER, exempt: "-__v -created_at -updated_at -is_active" }, request.query, { is_active: true }, {});
};
exports.getManySlider = getManySlider;
const updateSlider = async (request, response, next) => {
    const body = request.body;
    const crud_slider = new crud_1.Crud(request, response, next);
    crud_slider.update({ model: model_campaign_1.SLIDER, exempt: "-__v" }, { ...body }, { _id: request.params.id });
};
exports.updateSlider = updateSlider;
const deleteSlider = async (request, response, next) => {
    const crud_slider = new crud_1.Crud(request, response, next);
    crud_slider.delete({ model: model_campaign_1.SLIDER, exempt: "-__v -created_at -updated_at" }, { _id: request.params.id });
};
exports.deleteSlider = deleteSlider;
const createCampaign = async (request, response, next) => {
    try {
        const body = request.body;
        const gotten_body = { ...body };
        const crud_campaign = new crud_1.Crud(request, response, next);
        crud_campaign.create({ model: model_campaign_1.CAMPAIGN, exempt: "" }, gotten_body, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createCampaign = createCampaign;
const getOneCampaign = async (request, response, next) => {
    const crud_campaign = new crud_1.Crud(request, response, next);
    crud_campaign.getOne({ model: model_campaign_1.CAMPAIGN, exempt: "-__v -created_at updated_at -is_active" }, { campaign_name: request.params.id }, {});
};
exports.getOneCampaign = getOneCampaign;
const getManyCampaign = async (request, response, next) => {
    const crud_campaign = new crud_1.Crud(request, response, next);
    crud_campaign.getMany({ model: model_campaign_1.CAMPAIGN, exempt: "-__v -created_at -updated_at -is_active" }, request.query, { user: request.user.id }, {});
};
exports.getManyCampaign = getManyCampaign;
const updateCampaign = async (request, response, next) => {
    const body = request.body;
    if (request.body.image) {
        const get_image_url = await model_campaign_1.CAMPAIGN.findById(request.params.id);
        if (!get_image_url)
            throw (0, custom_error_1.APP_ERROR)("campaign banner not found");
        get_image_url.image ? (0, files_handler_1.imageDeleteHandler)(get_image_url.image) : "";
    }
    const crud_campaign = new crud_1.Crud(request, response, next);
    crud_campaign.update({ model: model_campaign_1.CAMPAIGN, exempt: "-__v" }, { campaign_name: request.params.id }, { ...body });
};
exports.updateCampaign = updateCampaign;
const deleteCampaign = async (request, response, next) => {
    const get_image_url = await model_campaign_1.CAMPAIGN.findById(request.params.id);
    if (!get_image_url)
        throw (0, custom_error_1.APP_ERROR)("campaign banner not found");
    get_image_url.image ? (0, files_handler_1.imageDeleteHandler)(get_image_url.image) : "";
    const crud_campaign = new crud_1.Crud(request, response, next);
    crud_campaign.delete({ model: model_campaign_1.CAMPAIGN, exempt: "-__v -created_at -updated_at" }, { _id: request.params.id });
};
exports.deleteCampaign = deleteCampaign;
