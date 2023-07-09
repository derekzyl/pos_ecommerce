import { Router } from "express";
import { AuthIndex } from "../../auth/index.auth";
import { GeneralIndex } from "../../general_factory/index.factory";
import { PermissionsE } from "../../general_factory/interface/general_factory";
import { TestIndex } from "../index.t";
import {
  formFileHandler,
  multer_upload,
} from "../../../utilities/file_handler/middleware.file";

const testRouter = Router();
testRouter
  .route("/")
  .post(
    multer_upload.fields([{ name: "file", maxCount: 1 }]),
    formFileHandler<{ file: string }>({ file: "" }, "test", false),
    // AuthIndex.protector,
    // GeneralIndex.getUserPermissions(PermissionsE.CREATE_ROLE),
    TestIndex.createTest
  )
  .get(
    // AuthIndex.protector,
    // GeneralIndex.getUserPermissions(PermissionsE.VIEW_ROLE),
    TestIndex.getAllTest
  );
testRouter
  .route("/:id")
  .patch(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.EDIT_ROLE),
    TestIndex.updateTest
  )
  .delete(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions(PermissionsE.DELETE_ROLE),
    TestIndex.deleteTest
  );
export default testRouter;
