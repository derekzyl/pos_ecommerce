import {
  NextFunction,
  Request,
  Response,
  Errback,
  ErrorRequestHandler,
} from "express";
import { LOG } from "./console";
import { HTTP_RESPONSE } from "./http_response";
import { responseMessage } from "./response_message";

class AppError extends Error {
  statusCode!: number;

  constructor(message?: string, status?: number) {
    super(message);
    //lets do some mongodb error management
    // if (message?.includes("E11000")) {
    //   this.message = "the data already exist in the database kindly check";
    // }
    Object.setPrototypeOf(this, new.target.prototype);
    this.stack = new Error().stack;

    if (message) {
      this.message = message;
    } else {
      this.message = "Something went wrong";
    }
    if (status) {
      this.statusCode = status;
    } else {
      this.statusCode = HTTP_RESPONSE.INTERNAL_SERVER_ERROR;
    }

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function APP_ERROR(message: string, status?: number) {
  const my_error = new AppError(message, status);
  return my_error;
}

export const errorCenter: ErrorRequestHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const error_status = error.statusCode ?? 500;

  let error_message: string = error.message;
  LOG.log(error.stack);

  //mongodb error
  if (error_message.includes("E11000")) {
    error_message = "data already exist in the database";
  }

  const error_info = error.information;

  response
    .status(error_status)
    .json(
      responseMessage({
        message: error_info,
        success_status: false,
        data: error_message,
        stack: error.stack,
      })
    );
};
