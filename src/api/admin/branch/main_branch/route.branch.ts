import { Router } from "express";
import { BranchIndex } from "../index.branch";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

const branchRouter = Router();

branchRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.CREATE_BRANCH,
      PermissionsE.SUPER_ADMIN,
    ]),
    BranchIndex.create_branch
  )
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_BRANCH,
      PermissionsE.SUPER_ADMIN,
    ]),
    BranchIndex.get_all_branch
  );
branchRouter
  .route("/:id")
  .get(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.VIEW_BRANCH,
      PermissionsE.SUPER_ADMIN,
    ]),
    BranchIndex.get_one_branch
  )
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.EDIT_BRANCH,
      PermissionsE.SUPER_ADMIN,
    ]),
    BranchIndex.update_branch
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([
      PermissionsE.DELETE_BRANCH,
      PermissionsE.SUPER_ADMIN,
    ]),
    BranchIndex.delete_branch
  );

export default branchRouter;
