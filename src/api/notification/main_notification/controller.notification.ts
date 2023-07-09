import { NextFunction, Response, Request } from "express";
import { Types } from "mongoose";

import { NOTIFICATION } from "./model.notification";
import { Crud } from "../../general_factory/crud";
import {
  NotificationT,
  NotificationDocI,
  NotificationBodyT,
} from "../interface_notification/interface.notification";

export const createNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: NotificationBodyT & { receiver: Types.ObjectId } = request.body;

    const gotten_body: NotificationT = { ...body, user: request.user.id };
    const crud_notification = new Crud(request, response, next);
    crud_notification.create<NotificationT, NotificationDocI>(
      { model: NOTIFICATION, exempt: "" },
      gotten_body,
      {}
    );
  } catch (error) {
    next(error);
  }
};

export const getOneNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_notification = new Crud(request, response, next);
  crud_notification.getOne<NotificationDocI>(
    { model: NOTIFICATION, exempt: "-__v -created_at updated_at" },
    { _id: request.params.id },
    {}
  );
};

export const getManyNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_notification = new Crud(request, response, next);
  crud_notification.getMany<NotificationDocI>(
    { model: NOTIFICATION, exempt: "-__v -created_at -updated_at" },
    request.query,
    { user: request.user.id },
    {}
  );
};

export const updateNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_notification = new Crud(request, response, next);
  crud_notification.update<NotificationT, NotificationDocI>(
    { model: NOTIFICATION, exempt: "-__v" },
    { _id: request.params.id },
    { ...body }
  );
};
export const deleteNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_notification = new Crud(request, response, next);
  crud_notification.delete<NotificationDocI>(
    { model: NOTIFICATION, exempt: "-__v -created_at -updated_at" },
    { _id: request.params.id }
  );
};

export const updateReadNotification = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_notification = new Crud(request, response, next);
  crud_notification.update<NotificationT, NotificationDocI>(
    { model: NOTIFICATION, exempt: "-__v" },
    { read_receipt: true },
    { _id: request.params.id }
  );
};
