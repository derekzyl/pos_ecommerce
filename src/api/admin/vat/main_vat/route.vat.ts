import { Router } from "express";

import { VatIndex } from "../index.vat";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const vatRouter = Router();

vatRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_VAT,
      PermissionsE.SUPER_ADMIN,
    ]),
    VatIndex.create_vat
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_VAT,
      PermissionsE.SUPER_ADMIN,
    ]),
    VatIndex.get_all_vat
  );
vatRouter
  .route("/:id")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_VAT,
      PermissionsE.SUPER_ADMIN,
    ]),

    VatIndex.get_one_vat
  )
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.EDIT_VAT,
      PermissionsE.SUPER_ADMIN,
    ]),
    VatIndex.update_vat
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.DELETE_VAT,
      PermissionsE.SUPER_ADMIN,
    ]),
    VatIndex.delete_vat
  );

export default vatRouter;
