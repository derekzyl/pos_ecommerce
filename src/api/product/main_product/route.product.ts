import { Router } from "express";

import { AuthIndex } from "../../auth/index.auth";

import { ProductIndex } from "../index.product";
import { GeneralIndex } from "../../general_factory/index.factory";
import { PermissionsE } from "../../general_factory/interface/general_factory";
import {
  multer_upload,
  formFileHandler,
} from "../../../utilities/file_handler/middleware.file";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_PRODUCT,
      PermissionsE.SUPER_ADMIN,
    ]),
    multer_upload.fields([
      { name: "image", maxCount: 1 },
      { name: "other_image", maxCount: 3 },
    ]),
    formFileHandler<{ image: string; other_image: string[] }>(
      { image: "", other_image: [] },
      "category",
      false
    ),
    ProductIndex.create_product
  )
  .get(ProductIndex.get_all_product);
productRouter
  .route("/:id")
  .get(ProductIndex.get_one_product)
  .patch(AuthIndex.protector, ProductIndex.update_product)
  .delete(AuthIndex.protector, ProductIndex.delete_product);

export default productRouter;
