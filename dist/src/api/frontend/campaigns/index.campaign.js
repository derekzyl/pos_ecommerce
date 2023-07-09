"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignIndex = void 0;
const controller_campaign_1 = require("./main_campaign/controller.campaign");
class Campaign {
    create_campaign = controller_campaign_1.createCampaign;
    get_one_campaign = controller_campaign_1.getOneCampaign;
    get_all_campaign = controller_campaign_1.getManyCampaign;
    update_campaign = controller_campaign_1.updateCampaign;
    delete_campaign = controller_campaign_1.deleteCampaign;
    create_slider = controller_campaign_1.createSlider;
    get_one_slider = controller_campaign_1.getOneSlider;
    get_all_slider = controller_campaign_1.getManySlider;
    update_slider = controller_campaign_1.updateSlider;
    delete_slider = controller_campaign_1.deleteSlider;
}
exports.CampaignIndex = new Campaign();
