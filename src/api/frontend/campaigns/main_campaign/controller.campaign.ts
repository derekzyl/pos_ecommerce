import { NextFunction, Response, Request } from "express";
import { Types } from "mongoose";

import { CAMPAIGN, SLIDER } from "./model.campaign";
import { Crud } from "../../../general_factory/crud";
import {
  SliderBodyT,
  SliderDocI,
  CampaignBodyT,
  CampaignDocI,
  SliderI,
  CampaignI,
} from "../interface_campaigns/interface.campaign";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { imageDeleteHandler } from "../../../../utilities/file_handler/files_handler";

export const createSlider = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: SliderBodyT & { receiver: Types.ObjectId } = request.body;

    const gotten_body: SliderI = { ...body };
    const crud_slider = new Crud(request, response, next);
    crud_slider.create<SliderI, SliderDocI>(
      { model: SLIDER, exempt: "" },
      gotten_body,
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneSlider = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_slider = new Crud(request, response, next);
  crud_slider.getOne<SliderDocI>(
    { model: SLIDER, exempt: "-__v -created_at updated_at -is_active" },
    { _id: request.params.id },
    { model: "product", fields: "-reviews" }
  );
};

export const getManySlider = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_slider = new Crud(request, response, next);
  crud_slider.getMany<SliderDocI>(
    { model: SLIDER, exempt: "-__v -created_at -updated_at -is_active" },
    request.query,
    { is_active: true },
    {}
  );
};

export const updateSlider = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_slider = new Crud(request, response, next);
  crud_slider.update<SliderI, SliderDocI>(
    { model: SLIDER, exempt: "-__v" },
    { ...body },
    { _id: request.params.id }
  );
};
export const deleteSlider = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_slider = new Crud(request, response, next);
  crud_slider.delete<SliderDocI>(
    { model: SLIDER, exempt: "-__v -created_at -updated_at" },
    { _id: request.params.id }
  );
};

export const createCampaign = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: CampaignBodyT = request.body;

    const gotten_body: CampaignI = { ...body };
    const crud_campaign = new Crud(request, response, next);
    crud_campaign.create<CampaignI, CampaignDocI>(
      { model: CAMPAIGN, exempt: "" },
      gotten_body,
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneCampaign = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_campaign = new Crud(request, response, next);
  crud_campaign.getOne<CampaignDocI>(
    { model: CAMPAIGN, exempt: "-__v -created_at updated_at -is_active" },
    { campaign_name: request.params.id },
    {}
  );
};

export const getManyCampaign = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_campaign = new Crud(request, response, next);
  crud_campaign.getMany<CampaignDocI>(
    { model: CAMPAIGN, exempt: "-__v -created_at -updated_at -is_active" },
    request.query,
    { user: request.user.id },
    {}
  );
};

export const updateCampaign = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  if (request.body.image) {
    const get_image_url = await CAMPAIGN.findById(request.params.id);
    if (!get_image_url) throw APP_ERROR("campaign banner not found");
    get_image_url.image ? imageDeleteHandler(get_image_url.image) : "";
  }
  const crud_campaign = new Crud(request, response, next);
  crud_campaign.update<CampaignI, CampaignDocI>(
    { model: CAMPAIGN, exempt: "-__v" },
    { campaign_name: request.params.id },
    { ...body }
  );
};
export const deleteCampaign = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const get_image_url = await CAMPAIGN.findById(request.params.id);
  if (!get_image_url) throw APP_ERROR("campaign banner not found");
  get_image_url.image ? imageDeleteHandler(get_image_url.image) : ""
  const crud_campaign = new Crud(request, response, next);
  crud_campaign.delete<CampaignDocI>(
    { model: CAMPAIGN, exempt: "-__v -created_at -updated_at" },
    { _id: request.params.id }
  );
};
