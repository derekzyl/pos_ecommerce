import { Router } from "express";
import { RoleIndex } from "../index.role";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const roleRouter = Router();
roleRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_ROLE,
      PermissionsE.SUPER_ADMIN,
    ]),
    RoleIndex.createRole
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_ROLE,
      PermissionsE.SUPER_ADMIN,
    ]),
    RoleIndex.getAllRole
  );
roleRouter
  .route("/:id")
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_ROLE),
    RoleIndex.updateRole
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_ROLE),
    RoleIndex.deleteRole
  );
export default roleRouter;
