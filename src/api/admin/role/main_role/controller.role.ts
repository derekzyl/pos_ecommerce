import { NextFunction, Request, Response } from "express";
import { RoleI } from "../interface_role/interface.role";

import { ROLE } from "./model.role";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { responseMessage } from "../../../../utilities/response_message";
import { LOG } from "../../../../utilities/console";

export const createRole = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  LOG.warn([
    "<---------------------------------inside role----",
    request.user,
    "---------------------->>",
  ]);
  // eslint-disable-next-line prefer-const
  let { name, permissions }: RoleI = request.body;

  try {
    name = name.toUpperCase();
    const name_regex = /^[A-Z]{3,}$/g;
    if (!name_regex.test(name)) {
      throw APP_ERROR(
        "please check the role name and use another name",
        HTTP_RESPONSE.FORBIDDEN
      );
    }
    if (name === "ADMIN" || name === "admin") {
      throw APP_ERROR(
        "you cant add the name admin, oops",
        HTTP_RESPONSE.FORBIDDEN
      );
    }
    const create_role = new ROLE({ name, permissions });
    const role_created = await create_role.save();
    response.status(HTTP_RESPONSE.CREATED).json(
      responseMessage({
        message: "role created successfully",
        success_status: true,
        data: role_created,
      })
    );
  } catch (error: any) {
    error.information = "error encountered creating role";
    next(error);
  }
};

export const getAllRole = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const get_all_role = await ROLE.find();
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "role gotten successfully",
        success_status: true,
        data: get_all_role,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const updateOneRole = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { role_id } = request.params;
  const { name } = request.body;

  try {
    const get_one_role = await ROLE.findById({ role_id });
    if (!get_one_role)
      throw APP_ERROR(
        "the role id is not in the database",
        HTTP_RESPONSE.BAD_REQUEST
      );
    const updated_role = await ROLE.findByIdAndUpdate(role_id, name);
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "role created successfully",
        success_status: true,
        data: updated_role,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const deleteOneRole = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { role_id } = request.params;

  try {
    const get_one_role = await ROLE.findById({ role_id });
    if (!get_one_role)
      throw APP_ERROR(
        "the role id is not in the database",
        HTTP_RESPONSE.BAD_REQUEST
      );
    const deleted_role = await ROLE.findByIdAndDelete(role_id);
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "role created successfully",
        success_status: true,
        data: deleted_role,
      })
    );
  } catch (error) {
    next(error);
  }
};
