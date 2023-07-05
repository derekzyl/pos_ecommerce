import { Router } from "express";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { DispatchIndex } from "../index.dispatch";

const dispatchRouter = Router();
dispatchRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.CREATE_DISPATCH),
    DispatchIndex.create_dispatch
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.VIEW_DISPATCH),
    DispatchIndex.get_all_dispatch_by_staff
  );
dispatchRouter
  .route("/:id")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_DISPATCH),
    DispatchIndex.get_one_dispatch_by_staff
  )
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_DISPATCH),
    DispatchIndex.update_dispatch_by_dispatcher
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_DISPATCH),
    DispatchIndex.delete_dispatch
  );

export default dispatchRouter;
