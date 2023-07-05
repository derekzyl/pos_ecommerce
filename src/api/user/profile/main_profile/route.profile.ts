import { Router } from "express";

import { ProfileIndex } from "../index.profile";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import {
  multer_upload,
  formFileHandler,
} from "../../../../utilities/file_handler/middleware.file";

const profileRouter = Router();

profileRouter
  .route("/")
  .post(
    AuthIndex.protector,
    multer_upload.fields([{ name: "profile_image", maxCount: 1 }]),
    formFileHandler<{ profile_image: string }>(
      { profile_image: "" },
      "category",
      false
    ),
    ProfileIndex.create_profile
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.VIEW_USER_PROFILE),
    ProfileIndex.get_all_profile
  );

profileRouter
  .route("/user")
  .get(
    AuthIndex.protector,

    ProfileIndex.get_one_profile
  )
  .patch(
    AuthIndex.protector,
    multer_upload.fields([{ name: "profile_image", maxCount: 1 }]),
    formFileHandler<{ profile_image: string }>(
      { profile_image: "" },
      "category",
      false
    ),
    ProfileIndex.update_profile
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_USER_PROFILE),
    ProfileIndex.delete_profile
  );

export default profileRouter;
