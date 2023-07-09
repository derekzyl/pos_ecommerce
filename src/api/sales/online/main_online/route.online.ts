import { Router } from "express";
import { OnlineSalesIndex } from "../index.online";
import { AuthIndex } from "../../../auth/index.auth";
import { getPermissions } from "../../../general_factory/permission_handler";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const onlineSalesRouter = Router();

onlineSalesRouter
  .route("/user/")
  .get(AuthIndex.protector, OnlineSalesIndex.get_one_order_by_user)
  .post(AuthIndex.protector, OnlineSalesIndex.create_online_sales);
onlineSalesRouter
  .route("/not-logged-in")
  .post(OnlineSalesIndex.check_out_sales);

onlineSalesRouter
  .route("/verify-purchase/")
  .post(OnlineSalesIndex.verify_online_sales);

onlineSalesRouter
  .route("/staff/accept-order-handling/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.EDIT_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.accept_order
  );
onlineSalesRouter
  .route("/staff/order-ready-for-dispatch/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.EDIT_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.process_order
  );

onlineSalesRouter
  .route("/staff/get-one-order/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.VIEW_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.get_one_order_by_staff
  );
onlineSalesRouter
  .route("/staff/get-many-order/")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.VIEW_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.get_many_order_by_staff
  );

onlineSalesRouter
  .route("/user/get-many-order/")
  .post(AuthIndex.protector, OnlineSalesIndex.get_many_order_by_user);

onlineSalesRouter
  .route("/user/get-one-order/")
  .post(AuthIndex.protector, OnlineSalesIndex.get_one_order_by_user);

onlineSalesRouter
  .route("/transfer-order/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.VIEW_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.transfer_order
  );

onlineSalesRouter
  .route("/handle-order-transfer/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.VIEW_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.handle_transfer_order
  );

onlineSalesRouter
  .route("/staff/get-one-order/:id")
  .post(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.VIEW_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.get_one_order_by_staff
  );

onlineSalesRouter
  .route("/staff/update-one-order/:id")
  .patch(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.HANDLE_ONLINE_ORDER,
      PermissionsE.EDIT_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.update_order_by_staff
  );
onlineSalesRouter
  .route("/admin/update-one-order/:id")
  .patch(
    AuthIndex.protector,
    getPermissions([PermissionsE.SUPER_ADMIN]),
    OnlineSalesIndex.update_order_by_admin
  );
onlineSalesRouter
  .route("/admin/delete-one-order/:id")
  .delete(
    AuthIndex.protector,
    getPermissions([
      PermissionsE.SUPER_ADMIN,
      PermissionsE.DELETE_ONLINE_ORDER,
    ]),
    OnlineSalesIndex.delete_order_by_staff
  );
export default onlineSalesRouter;
