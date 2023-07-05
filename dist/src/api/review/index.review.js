"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewIndex = void 0;
const controller_review_1 = require("./main_review/controller.review");
class Review {
    create_review = controller_review_1.createReview;
    get_one_review = controller_review_1.getOneReview;
    get_all_review = controller_review_1.getManyReview;
    update_review = controller_review_1.updateReview;
    delete_review = controller_review_1.deleteReview;
}
exports.ReviewIndex = new Review();
