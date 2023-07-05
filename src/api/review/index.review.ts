import {
  createReview,
  deleteReview,
  getManyReview,
  getOneReview,
  updateReview,
} from "./main_review/controller.review";

class Review {
  public create_review = createReview;
  public get_one_review = getOneReview;
  public get_all_review = getManyReview;
  public update_review = updateReview;
  public delete_review = deleteReview;
}
export const ReviewIndex = new Review();
