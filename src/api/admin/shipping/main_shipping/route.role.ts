import { Router } from "express";
import { ShippingIndex } from "../index.shipping";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const shippingRouter = Router();
shippingRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_SHIPPING_FEE,
      PermissionsE.SUPER_ADMIN,
    ]),
    ShippingIndex.create_shipping
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_SHIPPING_FEE,
      PermissionsE.SUPER_ADMIN,
    ]),
    ShippingIndex.get_all_shipping_fee
  );
shippingRouter
  .route("/:id")
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.EDIT_SHIPPING_FEE,
      PermissionsE.SUPER_ADMIN,
    ]),
    ShippingIndex.update_shipping_fee
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.DELETE_SHIPPING_FEE,
      PermissionsE.SUPER_ADMIN,
    ]),
    ShippingIndex.delete_shipping_fee
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_SHIPPING_FEE,
      PermissionsE.SUPER_ADMIN,
    ]),
    ShippingIndex.get_one_shipping_fee
  );

export default shippingRouter;
