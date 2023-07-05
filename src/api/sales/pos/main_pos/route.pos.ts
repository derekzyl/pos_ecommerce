import { Router } from "express";

import { PosIndex } from "../index.pos";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const posRouter = Router();

posRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.CREATE_POS),
    PosIndex.create_pos
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.VIEW_POS),
    PosIndex.get_all_pos
  );

posRouter
  .route("/products")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.VIEW_POS),
    PosIndex.get_products
  );
posRouter
  .route("/:id")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.VIEW_POS),

    PosIndex.get_one_pos
  )
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_POS),
    PosIndex.update_pos
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_POS),
    PosIndex.delete_pos
  );

export default posRouter;
