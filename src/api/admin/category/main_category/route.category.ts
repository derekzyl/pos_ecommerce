import { Router } from "express";

import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { CategoryIndex, SubCategoryIndex } from "../index.category";
import {
  formFileHandler,
  multer_upload,
} from "../../../../utilities/file_handler/middleware.file";

const categoryRouter = Router();
const subCategoryRouter = Router();

categoryRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    multer_upload.fields([{ name: "image", maxCount: 1 }]),
    formFileHandler<{ image: string }>({ image: "" }, "category", false),
    CategoryIndex.create_category
  )
  .get(CategoryIndex.get_all_category);
categoryRouter
  .route("/:id")
  .get(CategoryIndex.get_one_category)
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.EDIT_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    CategoryIndex.update_category
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.DELETE_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    CategoryIndex.delete_category
  );

subCategoryRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    multer_upload.fields([{ name: "image", maxCount: 1 }]),
    formFileHandler<{ image: string }>({ image: "" }, "category", false),
    SubCategoryIndex.create_sub_category
  )
  .get(SubCategoryIndex.get_all_sub_category);
subCategoryRouter
  .route("/:id")
  .get(SubCategoryIndex.get_one_sub_category)
  .patch(

    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.EDIT_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    multer_upload.fields([{ name: "image", maxCount: 1 }]),
    formFileHandler<{ image: string }>({ image: "" }, "category", false),
    SubCategoryIndex.update_sub_category
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.DELETE_CATEGORY,
      PermissionsE.SUPER_ADMIN,
    ]),
    SubCategoryIndex.delete_sub_category
  );

export { subCategoryRouter, categoryRouter };
