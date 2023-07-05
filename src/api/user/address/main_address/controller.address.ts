import { NextFunction, Response, Request } from "express";

import { ADDRESS } from "./model.address";

import {
  AddressBodyT,
  AddressDocI,
} from "../interface_address/interface.address";
import { Crud } from "../../../general_factory/crud";
import { checkPermissions } from "../../../general_factory/permission_handler";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { Types } from "mongoose";
import { phone_regex } from "../../../../utilities/regex";
import { APP_ERROR } from "../../../../utilities/custom_error";

//todo address receipt

export const createAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user;

    const body: AddressBodyT = request.body;
    const regex_check = phone_regex.test(body.phone);
    if (!regex_check) {
      throw APP_ERROR("invalid phone number");
    }

    // find the  user address length
    const get_addresses = await ADDRESS.find({ user: request.user.id });
    if (!get_addresses || get_addresses.length < 1) {
      body.is_default = true;
    }
    const crud_address = new Crud(request, response, next);
    crud_address.create<AddressBodyT & { user: Types.ObjectId }, AddressDocI>(
      { model: ADDRESS, exempt: "" },
      { ...body, user: user.id },
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const check_user_clearance = checkPermissions(
    PermissionsE.VIEW_USER_PROFILE,
    request.user
  );

  console.log("request", request.params.id, "this is the id");
  const user = check_user_clearance ? undefined : request.user.id;
  const crud_address = new Crud(request, response, next);
  crud_address.getOne<AddressDocI>(
    { model: ADDRESS, exempt: "-__v -user " },
    { _id: request.params.id, user },
    {}
  );
};

export const getManyAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getMany<AddressDocI>(
    { model: ADDRESS, exempt: "-__v, -user " },
    request.query,
    {},
    {}
  );
};

export const updateAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_review = new Crud(request, response, next);
  crud_review.update<AddressBodyT, AddressDocI>(
    { model: ADDRESS, exempt: "-__v" },
    { ...body },
    { id: request.params.id }
  );
};
export const deleteAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.delete<AddressDocI>(
    { model: ADDRESS, exempt: "-__v -created_at -updated_at" },
    { id: request.params.id }
  );
};
