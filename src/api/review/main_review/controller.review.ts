import { NextFunction, Response, Request } from "express";
import {
  ReviewBodyT,
  ReviewDocI,
  ReviewI,
} from "../interface_review/interface.review";
import { Crud } from "../../general_factory/crud";
import { REVIEW } from "./model.review";
import { USER } from "../../auth/main_auth/model.auth";
import { PROFILE } from "../../user/profile/main_profile/model.profile";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";

export const createReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: ReviewBodyT = request.body;
    const find_profile = await PROFILE.findOne({ user: request.user.id });
    if (!find_profile)
      throw APP_ERROR("the profile isn't found", HTTP_RESPONSE.BAD_REQUEST);
    const review_data: ReviewI = { ...body, profile: find_profile.id };

    const crud_review = new Crud(request, response, next);
    crud_review.create<ReviewBodyT, ReviewDocI>(
      { model: REVIEW, exempt: "" },
      review_data,
      {
        user: request.user.id,
        product: body.product,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getOne<ReviewDocI>(
    { model: REVIEW, exempt: "-__v" },
    { _id: request.params.id },
    { model: "profile", fields: "-user" }
  );
};

export const getUserReviews = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  const profile = await PROFILE.findOne({ user: request.user.id });
  if (!profile)
    throw APP_ERROR(
      "i wonder why this user is'nt found in the database",
      HTTP_RESPONSE.FORBIDDEN
    );

  crud_review.getMany<ReviewDocI>(
    { model: REVIEW, exempt: "-__v -created_at -updated_at" },

    request.query,
    { profile: profile.id },
    { model: "profile", fields: "-user" }
  );
};

export const getManyReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getMany<ReviewDocI>(
    { model: REVIEW, exempt: "-__v -created_at -updated_at" },
    request.query,
    {},
    { model: "profile", fields: "-user" }
  );
};

export const updateReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = {
    rating: request.body.rating,
    comment: request.body.comment,
    updated_at: Date.now,
  };
  const crud_review = new Crud(request, response, next);
  crud_review.update<ReviewBodyT, ReviewDocI>(
    { model: REVIEW, exempt: "-__v" },
    { ...body },
    { _id: request.params.id }
  );
};
export const deleteReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.delete<ReviewDocI>(
    { model: REVIEW, exempt: "-__v" },
    { _id: request.params.id }
  );
};
