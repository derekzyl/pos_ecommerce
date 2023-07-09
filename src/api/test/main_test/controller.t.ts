import { NextFunction, Request, Response } from "express";
import { LOG } from "../../../utilities/console";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { responseMessage } from "../../../utilities/response_message";
import { ROLE } from "../../admin/role/main_role/model.role";
import { PaymentIndex } from "../../../utilities/payment/index.payment";
import { PaystackPayI } from "../../../utilities/interface_utilities/payment.interface";
import { generateId } from "../../../utilities/id_generator";
import { IdGenE } from "../../../utilities/interface_utilities/id_gen.interface";
import { imageDeleteHandler } from "../../../utilities/file_handler/files_handler";

export const createTest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line prefer-const
  console.log(
    "<---------request body file",
    request.body.file,

    "-------------------------------->"
  );
  if (request.body.file) {
    imageDeleteHandler(request.body.file);
  }

  console.log("<---------request body game", request.body.game);

  const fg = generateId(IdGenE.WEB_SALES);
  console.log(fg);

  try {
    const paystack_data: PaystackPayI = {
      email: "derekzyl@gmail.com",
      amount: 400 * 100,
      reference: fg,
    };
    // const paystack = PaymentIndex.paystack;
    // const pay = new paystack();
    // const init_pay = await pay.initialize(paystack_data);
    return response.json({ url: "init_pay.data.authorization_url " });
    // return response.json({ url: init_pay.data.authorization_url });
  } catch (error: any) {
    error.information = "error encountered creating test";
    next(error);
  }
};

// WEB_15062023603_43036_42588

export const getAllTest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const paystack = PaymentIndex.paystack;
    const pay = new paystack();
    const v = await pay.verifyPayment("WEB_16062023312_23123_87412");
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "test gotten successfully",
        success_status: true,
        data: v,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const updateOneTest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { test_id } = request.params;
  const { name } = request.body;

  try {
    const get_one_test = await ROLE.findById({ test_id });
    if (!get_one_test)
      throw APP_ERROR(
        "the test id is not in the database",
        HTTP_RESPONSE.BAD_REQUEST
      );
    const updated_test = await ROLE.findByIdAndUpdate(test_id, name);
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "test created successfully",
        success_status: true,
        data: updated_test,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const deleteOneTest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { test_id } = request.params;

  try {
    const get_one_test = await ROLE.findById({ test_id });
    if (!get_one_test)
      throw APP_ERROR(
        "the test id is not in the database",
        HTTP_RESPONSE.BAD_REQUEST
      );
    const deleted_test = await ROLE.findByIdAndDelete(test_id);
    response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        message: "test created successfully",
        success_status: true,
        data: deleted_test,
      })
    );
  } catch (error) {
    next(error);
  }
};
