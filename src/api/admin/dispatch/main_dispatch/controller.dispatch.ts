import { NextFunction, Response, Request } from "express";
import { Types } from "mongoose";

import { DISPATCH } from "./model.dispatch";

import {
  DispatchI,
  DispatchDocI,
  DispatchBodyT,
  DeliveryStatusE,
} from "../interface_dispatch/interface.dispatch";
import { Crud } from "../../../general_factory/crud";

export const createDispatch = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: DispatchBodyT & { receiver: Types.ObjectId } = request.body;

    const gotten_body: DispatchI = { ...body, dispatched_by: request.user.id };
    const crud_dispatch = new Crud(request, response, next);
    crud_dispatch.create<DispatchI, DispatchDocI>(
      { model: DISPATCH, exempt: "" },
      gotten_body,
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneDispatchByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.getOne<DispatchDocI>(
    { model: DISPATCH, exempt: "-__v -created_at updated_at" },
    { tracking_id: request.params.id, dispatched_to: request.user.id },
    {}
  );
};

export const getOneDispatchByStaff = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.getOne<DispatchDocI>(
    { model: DISPATCH, exempt: "-__v -created_at updated_at" },
    { tracking_id: request.params.id },
    {}
  );
};

export const getManyDispatchByStaff = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.getMany<DispatchDocI>(
    { model: DISPATCH, exempt: "-__v -created_at updated_at" },
    request.query,
    {},
    {}
  );
};
export const getManyDispatchByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.getMany<DispatchDocI>(
    { model: DISPATCH, exempt: "-__v -created_at -updated_at" },
    request.query,
    { dispatched_to: request.user.id },
    {}
  );
};

export const updateDispatchByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: Partial<Pick<DispatchBodyT, "user_has_received">> = request.body;
  const crud_dispatch = new Crud(request, response, next);
  const data: Partial<DispatchI> = {
    received_at: body.user_has_received ? new Date() : undefined,
    user_has_received: body.user_has_received ? true : false,
    delivery_status: body.user_has_received
      ? DeliveryStatusE.RECEIVED_BY_CUSTOMER
      : DeliveryStatusE.PENDING,
  };

  crud_dispatch.update<DispatchI, DispatchDocI>(
    { model: DISPATCH, exempt: "-__v" },
    { ...data },
    { tracking_id: request.params.id }
  );
};
export const updateDispatchByDispatcher = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: Partial<
    Pick<
      DispatchI,
      "dispatcher_has_dispatched" | "is_dispatched" | "dispatched_at"
    >
  > = request.body;
  const data: Partial<DispatchI> = {
    ...body,
    delivery_status: body.dispatcher_has_dispatched
      ? DeliveryStatusE.DELIVERED_BY_DISPATCHER
      : DeliveryStatusE.ON_TRANSIT,
  };
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.update<DispatchI, DispatchDocI>(
    { model: DISPATCH, exempt: "-__v" },

    { ...data },
    { tracking_id: request.params.id }
  );
};
export const deleteDispatch = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_dispatch = new Crud(request, response, next);
  crud_dispatch.delete<DispatchDocI>(
    { model: DISPATCH, exempt: "-__v -created_at -updated_at" },
    { dispatch_name: request.params.id }
  );
};
