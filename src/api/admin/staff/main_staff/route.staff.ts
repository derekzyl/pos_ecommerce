import { Router } from "express";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { StaffIndex } from "../index.staff";
import {
  formFileHandler,
  multer_upload,
} from "../../../../utilities/file_handler/middleware.file";

const staffRouter = Router();

staffRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_STAFF,
      PermissionsE.SUPER_ADMIN,
    ]),
    multer_upload.fields([{ name: "image", maxCount: 1 }]),
    formFileHandler<{ image: string }>({ image: "" }, "category", false),

    StaffIndex.create_staff
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_STAFF,
      PermissionsE.SUPER_ADMIN,
    ]),
    StaffIndex.get_all_staff
  );

staffRouter
  .route("/:id")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_STAFF,
      PermissionsE.SUPER_ADMIN,
    ]),
    StaffIndex.get_one_staff
  )
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_STAFF),
    StaffIndex.update_staff
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_STAFF),
    StaffIndex.delete_staff
  );

staffRouter
  .route("/me/staff/:id")
  .get(AuthIndex.protector, StaffIndex.get_staff_profile)
  .patch(AuthIndex.protector, StaffIndex.staff_update_self);

export default staffRouter;
