import { Router } from "express";
import { CampaignIndex } from "../index.campaign";
import { AuthIndex } from "../../../auth/index.auth";
import { getPermissions } from "../../../general_factory/permission_handler";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { multer_upload, formFileHandler } from "../../../../utilities/file_handler/middleware.file";

export const campaignRouter = Router();
export const campaignRouterF = Router();
export const sliderRouter = Router();
export const sliderRouterF = Router();

campaignRouterF.route("/").get(CampaignIndex.get_all_campaign);
sliderRouterF.route("/").get(CampaignIndex.get_all_slider);

campaignRouter
  .route("/")
  .post(
    AuthIndex.protector,
    multer_upload.fields([
      { name: "image", maxCount: 1 },
    ]),
    formFileHandler<{ image: string }>(
      { image: "" },
      "campaign",
      false
    ),
    getPermissions([PermissionsE.CREATE_CAMPAIGN, PermissionsE.SUPER_ADMIN]),
    CampaignIndex.create_campaign
  )
  .get(CampaignIndex.get_all_campaign);
campaignRouter
  .route("/:id")
  .get(CampaignIndex.get_one_campaign)
  .patch(
    AuthIndex.protector,
    getPermissions([PermissionsE.EDIT_CAMPAIGN, PermissionsE.SUPER_ADMIN]),

    CampaignIndex.update_campaign
  )

  .delete(
    AuthIndex.protector,
    getPermissions([PermissionsE.DELETE_CAMPAIGN, PermissionsE.SUPER_ADMIN]),
    CampaignIndex.delete_campaign
  );

sliderRouter
  .route("/")
  .post(
    AuthIndex.protector,
    getPermissions([PermissionsE.CREATE_SLIDER, PermissionsE.SUPER_ADMIN]),
    CampaignIndex.create_slider
  )
  .get(CampaignIndex.get_all_slider);
sliderRouter
  .route("/:id")
  .get(CampaignIndex.get_one_slider)
  .patch(
    AuthIndex.protector,
    getPermissions([PermissionsE.EDIT_SLIDER, PermissionsE.SUPER_ADMIN]),
    CampaignIndex.update_slider
  )
  .delete(
    AuthIndex.protector,
    getPermissions([PermissionsE.DELETE_SLIDER, PermissionsE.SUPER_ADMIN]),
    CampaignIndex.delete_slider
  );
