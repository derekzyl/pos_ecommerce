import { NextFunction, Response, Request } from "express";
import { Crud } from "../../../general_factory/crud";
import { POS } from "./model.pos";
import { BRANCH } from "../../../admin/branch/main_branch/model.branch";
import { STAFF } from "../../../admin/staff/main_staff/model.staff";
import { generateId } from "../../../../utilities/id_generator";
import { PosBodyI, PosDbI, PosDocI } from "../interface_pos/interface.pos";
import {
  OrderStatusE,
  PaymentStatusE,
  ProductT,
  SalesTypeE,
} from "../../interface_sales/interface.sales";
import { VAT } from "../../../admin/vat/main_vat/model.vat";
import { VatE } from "../../../admin/vat/interface_vat/interface.vat";
import { PRODUCT } from "../../../product/main_product/model.product";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { responseMessage } from "../../../../utilities/response_message";
import { IdGenE } from "../../../../utilities/interface_utilities/id_gen.interface";

// todo: get products for pos
//! remove original amount
export const createPos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const order_id = generateId(IdGenE.POS_SALES);
    const body: PosBodyI = request.body;
    let order_status = OrderStatusE.PENDING;
    const get_staff = await STAFF.findOne({ user: request.user.id });
    const get_branch = await BRANCH.findOne({
      id: get_staff?.branch.id,
    });
    const payment_method = body.payment_method;
    let payment_status = PaymentStatusE.PROCESSING;
    /**
     * server total is the total for the products ordered when the discount has been removed
     */
    let server_total = 0;
    const get_vat = await VAT.findOne({ vat_name: VatE.LOCAL });
    const sales_type = SalesTypeE.STORE_SALES;
    const products = body.products;
    const total_amount = Number(body.total_amount);
    const original_amount = Number(body.original_amount);
    const order_type = body.order_type;
    const all_products: ProductT[] = [];
    const discount = Number(body.discount);
    const amount_sold = Number(body.amount_sold);
    for (const product of products) {
      await getProductsData(product);
    }

    // eslint-disable-next-line no-inner-declarations
    async function getProductsData(product: ProductT) {
      const get_product = await PRODUCT.findById(product.product.id);
      if (!get_product) throw APP_ERROR("product not found in database");
      const product_price = Number(get_product?.price);
      const get_discount_of_product =
        (get_product?.discount_percentage * product_price) / 100;
      const product_quantity = Number(product.quantity_of_product);
      if (product_quantity < 1) {
        payment_status = PaymentStatusE.PROCESSING;
        throw APP_ERROR(`less than 1 of ${get_product?.name} is selected `);
      }
      const get_total: number =
        product_price * product_quantity - (get_discount_of_product ?? 0);
      if (Number(product.total !== get_total)) {
        payment_status = PaymentStatusE.DISPUTE;
        throw APP_ERROR(
          `${get_product.name} total doesn't tally with the expected total`
        );
      }
      server_total += get_total;

      const one_product: ProductT = {
        product: get_product.id,
        quantity_of_product: product_quantity,
        total: get_total,
      };
      all_products.push(one_product);

      // lets work on the  product count in the database
      // updated the total stock from product count
      get_product.number_in_stock = get_product.number_in_stock - 1;
      get_product.save();

      // updated the total stock from branch product count
      get_branch?.products
        .filter((prd) => prd.product.id === get_product.id)
        .forEach((prd) => (prd.amount_in_stock = prd.amount_in_stock - 1));
      get_branch?.save();
    }

    // getting the vat ( value added tax)
    let vat = 0;
    if (get_vat) {
      vat = Number(get_vat.vat_percentage);
    }
    const vat_server_total = (server_total * vat) / 100;
    // total amount and server total are same we are just trying to make sure we check the sales our selves
    // Note: this is the product price sum checking for product discount too
    const discount_server_total = (server_total * discount) / 100;

    // server amount sold is server total  + (plus) vat and a general discount if there is any discount from sales

    const server_amount_sold =
      server_total + vat_server_total - discount_server_total;

    order_status = OrderStatusE.SUCCESS;
    payment_status = PaymentStatusE.APPROVED;
    const pos_body: PosDbI = {
      order_id,
      products: all_products,
      order_type,
      order_status,
      payment_method,
      payment_status,
      sold_by: get_staff?.id,
      branch: get_branch?.id,
      vat,
      server_total,
      original_amount,
      sales_type,
      total_amount,
      discount,
      amount_sold,
      server_amount_sold,
    };

    const crud_pos = new Crud(request, response, next);
    crud_pos.create<PosBodyI, PosDocI>({ model: POS, exempt: "" }, pos_body, {
      order_id,
    });
  } catch (error) {
    next(error);
  }
};

export const getOnePos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_pos = new Crud(request, response, next);
  crud_pos.getOne<PosDocI>(
    { model: POS, exempt: "-__v -created_at updated_at" },
    { _id: request.params.id },
    {}
  );
};

export const getManyPos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_pos = new Crud(request, response, next);
  crud_pos.getMany<PosDocI>(
    { model: POS, exempt: "-__v -created_at -updated_at" },
    request.query,
    {},
    {}
  );
};

export const getManyPosProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const get_staff = await STAFF.findOne({ user: request.user.id });
    const get_branch = await BRANCH.findOne({
      id: get_staff?.branch.id,
    }).populate({ path: "product", match: { name: request.query.name } });
    let get_branch_product = get_branch?.products;
    if (get_branch_product) {
      get_branch_product = get_branch_product.filter(
        (product) => product.amount_in_stock > 0
      );
    }

    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: get_branch_product,
        message: "data fetched successfully",
        success_status: true,
        doc_length: get_branch_product?.length,
      })
    );
  } catch (error) {
    return response.status(HTTP_RESPONSE.BAD_REQUEST).json(
      responseMessage({
        data: error,
        message: "data fetched not fetched",
        success_status: false,
      })
    );
  }
};

export const updatePos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_pos = new Crud(request, response, next);
  crud_pos.update<PosBodyI, PosDocI>(
    { model: POS, exempt: "-__v" },
    { ...body },
    { _id: request.params.id }
  );
};
export const deletePos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_pos = new Crud(request, response, next);
  crud_pos.delete<PosDocI>(
    { model: POS, exempt: "-__v -created_at -updated_at" },
    { _id: request.params.id }
  );
};
