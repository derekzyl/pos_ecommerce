import { NextFunction, Response, Request } from "express";

import { PROFILE } from "./model.profile";

import {
  ProfileBodyT,
  ProfileDocI,
} from "../interface_profile/interface.profile";
import { Crud } from "../../../general_factory/crud";
import { getRole } from "../../../../utilities/get_role";
import {
  checkPermissions,
  getPermissions,
} from "../../../general_factory/permission_handler";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { responseMessage } from "../../../../utilities/response_message";
import { Types } from "mongoose";

//todo profile receipt

export const createProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // const user = request.user;

    const body: ProfileBodyT = request.body;
    const crud_profile = new Crud(request, response, next);
    crud_profile.create<ProfileBodyT & { user: Types.ObjectId }, ProfileDocI>(
      { model: PROFILE, exempt: "" },
      { ...body, user: body.user_id },
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const get_role = await getRole(request.user.id);
    let profile;
    const user = request.user;
    if (get_role && get_role.name === "USER") {
      profile = await PROFILE.findOne({
        user,
      }).select("-__v id");
    } else if (
      request.params.id &&
      checkPermissions(PermissionsE.VIEW_USER_PROFILE, user)
    ) {
      profile = await PROFILE.findById(request.params.id);
    }

    profile = profile?.populate("user", "phone");

    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: profile,
        message: "fetched successfully",
        success_status: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getManyProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getMany<ProfileDocI>(
    { model: PROFILE, exempt: "-__v, -user " },
    request.query,
    {},
    {}
  );
};

export const updateProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  const check_permissions = checkPermissions(
    PermissionsE.EDIT_USER_PROFILE,
    request.user.id
  );
  const data = {
    user: check_permissions ? null : request.user.id,
    id: check_permissions ? request.params.id : null,
  };
  const crud_review = new Crud(request, response, next);
  crud_review.update<ProfileBodyT, ProfileDocI>(
    { model: PROFILE, exempt: "-__v -user" },
    { ...body },
    data
  );
};

export const deleteProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const check_permissions = checkPermissions(
    PermissionsE.DELETE_USER_PROFILE,
    request.user.id
  );
  const data = {
    user: check_permissions ? undefined : request.user.id,
    id: check_permissions ? request.params.id : undefined,
  };
  const crud_review = new Crud(request, response, next);
  crud_review.delete<ProfileDocI>(
    { model: PROFILE, exempt: "-__v -created_at -updated_at" },
    data
  );
};
