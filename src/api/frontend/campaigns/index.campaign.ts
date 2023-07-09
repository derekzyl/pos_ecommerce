import {
  createCampaign,
  getOneCampaign,
  getManyCampaign,
  updateCampaign,
  deleteCampaign,
  createSlider,
  getOneSlider,
  getManySlider,
  updateSlider,
  deleteSlider,
} from "./main_campaign/controller.campaign";

class Campaign {
  public create_campaign = createCampaign;
  public get_one_campaign = getOneCampaign;
  public get_all_campaign = getManyCampaign;
  public update_campaign = updateCampaign;
  public delete_campaign = deleteCampaign;
  public create_slider = createSlider;
  public get_one_slider = getOneSlider;
  public get_all_slider = getManySlider;
  public update_slider = updateSlider;
  public delete_slider = deleteSlider;
}
export const CampaignIndex = new Campaign();
