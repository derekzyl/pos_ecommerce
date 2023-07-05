import { Router } from "express";
import { DispatchIndex } from "../../../admin/dispatch/index.dispatch";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const userDispatchRouter = Router()


userDispatchRouter
  .route("/")
  .get(
    AuthIndex.protector,
    DispatchIndex.get_all_dispatch_by_user
  );
userDispatchRouter
  .route("/:id")
  .get(    AuthIndex.protector,
    DispatchIndex.get_one_dispatch_by_user)
  .patch(
    AuthIndex.protector,
    DispatchIndex.update_dispatch_by_user
  )
export default userDispatchRouter