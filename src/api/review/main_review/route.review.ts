import { Router } from "express";

import { AuthIndex } from "../../auth/index.auth";

import { ReviewIndex } from "../index.review";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .post(AuthIndex.protector, ReviewIndex.create_review)
  .get(AuthIndex.protector, ReviewIndex.get_all_review);
reviewRouter
  .route("/:id")
  .get(
    AuthIndex.protector,

    ReviewIndex.get_one_review
  )
  .patch(AuthIndex.protector, ReviewIndex.update_review)
  .delete(AuthIndex.protector, ReviewIndex.delete_review);

export default reviewRouter;
