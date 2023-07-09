import { Router } from "express";
import {
  multer_upload,
  formFileHandler,
} from "../../../../utilities/file_handler/middleware.file";
import { AuthIndex } from "../../../auth/index.auth";
import { GeneralIndex } from "../../../general_factory/index.factory";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { BlogIndex } from "../index.blog";

const blogRouter = Router();

blogRouter
  .route("/")
  .post(
    AuthIndex.protector,
    GeneralIndex.getUserPermissions([PermissionsE.SUPER_ADMIN]),
    multer_upload.fields([
      { name: "image", maxCount: 1 },
      { name: "other_image", maxCount: 3 },
    ]),
    formFileHandler<{ image: string; other_image: string[] }>(
      { image: "", other_image: [] },
      "blog",
      false
    ),
    BlogIndex.create_blog
  )
  .get(BlogIndex.get_all_blog);
blogRouter
  .route("/:id")
  .get(BlogIndex.get_one_blog)
  .patch(AuthIndex.protector, BlogIndex.update_blog)
  .delete(AuthIndex.protector, BlogIndex.delete_blog);

export default blogRouter;
