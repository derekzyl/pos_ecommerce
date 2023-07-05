import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import {
  AcceptanceStatusE,
  MessageT,
  MessageTypeE,
  OnlineBodyT,
  OnlineDocI,
  OnlineI,
  OnlineOrderStatusE,
} from "../interface_online/interface.online";
import { ADDRESS } from "../../../user/address/main_address/model.address";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { CART, CART_ITEM } from "../../../user/cart/main_cart/model.cart";
import { calculateAddressFee, customMessage } from "./service.online";
import { n } from "../../../../utilities/number_checker";
import { PRODUCT } from "../../../product/main_product/model.product";
import { ProductAndCount } from "../../../user/cart/interface_cart/interface.cart";
import { generateId } from "../../../../utilities/id_generator";
import {
  OrderStatusE,
  PaymentMethodE,
  PaymentStatusE,
} from "../../interface_sales/interface.sales";
import { IdGenE } from "../../../../utilities/interface_utilities/id_gen.interface";
import { VAT } from "../../../admin/vat/main_vat/model.vat";
import { VatE } from "../../../admin/vat/interface_vat/interface.vat";
import { ONLINE_ORDER } from "./model.online";
import { PaystackPayI } from "../../../../utilities/interface_utilities/payment.interface";
import { PaymentIndex } from "../../../../utilities/payment/index.payment";
import { DISPATCH } from "../../../admin/dispatch/main_dispatch/model.dispatch";
import { BRANCH } from "../../../admin/branch/main_branch/model.branch";
import { BranchTypeE } from "../../../admin/branch/interface_branch/interface.branch";
import { STAFF } from "../../../admin/staff/main_staff/model.staff";
import { USER } from "../../../auth/main_auth/model.auth";
import { PermissionsE } from "../../../general_factory/interface/general_factory";
import { StaffI } from "../../../admin/staff/interface_staff/interface.staff";
import { NOTIFICATION } from "../../../notification/main_notification/model.notification";
import { REVIEW } from "../../../review/main_review/model.review";
import { PROFILE } from "../../../user/profile/main_profile/model.profile";
import { Crud } from "../../../general_factory/crud";

// 1) create a post online order ✅done
// 2) the dispatch rider should be able to maintain the messages on the order dispatch update
// 3) update general update status with update clearance
// 4) get all orders by staff
// 5) get all orders by user
// 6) get one order by staff or user
// 7) customer should be able to review product after purchase ✅done
// meaning we can create a new review of the product and review it ✅done

export const createOnlineSales = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // 1.1) get the request body

    const body: OnlineBodyT = request.body;
    // 1.2 find if the user has any address at all
    const find_address = await ADDRESS.find({ user: request.user.id });
    if (!find_address)
      throw APP_ERROR("No address found", HTTP_RESPONSE.BAD_REQUEST);
    // 1.3  get the user default address
    // find if the user has a default address
    let user_address = await ADDRESS.findOne({
      user: request.user.id,
      is_default: true,
    });
    if (body.address) user_address = await ADDRESS.findById(body.address);
    const shipping_fee = calculateAddressFee(user_address!.id);

    if (!user_address)
      throw APP_ERROR("you have no default address", HTTP_RESPONSE.BAD_REQUEST);

    const get_vat = await VAT.findOne({ vat_name: VatE.ONLINE });

    // 1.4 get the cart id
    let total_shipping_fee = 0;
    // amount after discount is applied
    let total_amount = 0;

    //amount before discount
    let original_amount = 0;

    //vat shipping fee_total price
    let amount_sold = 0;
    // discount
    let discount = 0;
    // product and count
    const products: ProductAndCount[] = [];

    // first message
    const message: MessageT[] = [
      {
        read_receipt: false,
        created_at: new Date(),
        information:
          "your order has been created and payment is being confirmed",
        updated_at: new Date(),
        title: "payment initialized",
        message_type: MessageTypeE.TEXT,
      },
    ];

    for (const cart_item of body.cart_items) {
      const get_cart_item_in_db = await CART_ITEM.findById(cart_item);
      if (!get_cart_item_in_db) throw APP_ERROR("cart_item not found");
      const get_product = await PRODUCT.findById(
        get_cart_item_in_db.product.id
      );
      if (!get_product) throw APP_ERROR("cart_item not found");

      // a) calculate total product price
      const product_shipping_fee =
        (await shipping_fee) * n(get_cart_item_in_db.product_total_count);
      const total_product_price =
        n(get_product.price) * n(get_cart_item_in_db.product_total_count);
      const total_product_price_and_discount =
        total_product_price +
        (total_product_price * n(get_product.discount_percentage)) / 100;
      const get_total_discount =
        (total_product_price * n(get_product.discount_percentage)) / 100;
      // updating the product data
      const product: ProductAndCount = {
        product: get_product.id,
        product_total_count: get_cart_item_in_db.product_total_count,
        product_total_price: total_product_price_and_discount,
        shipping_fee: product_shipping_fee,
      };
      products.push(product);

      // concatenating the total cumulative data
      original_amount += total_product_price;
      total_amount += total_product_price_and_discount;
      discount += get_total_discount;
      total_shipping_fee += product_shipping_fee;

      //lets start calculations
    }

    const vat = get_vat?.vat_percentage
      ? (total_amount * n(get_vat?.vat_percentage)) / 100
      : 0;
    // 1.5 get data from cart and update the  online checkout
    // what to omit a payment_method, payment_status, sales_type,
    amount_sold = vat + total_shipping_fee + total_amount;
    const online_checkout: Partial<OnlineI> = {
      order_id: generateId(IdGenE.WEB_SALES),
      user: request.user.id,
      address: user_address.id,
      message,
      products,
      vat,
      amount_sold,
      server_amount_sold: amount_sold,
      server_total: total_amount,
      discount,
      total_amount,
      original_amount,
    };
    const create_online_order = new ONLINE_ORDER(online_checkout);
    const created_order = await create_online_order.save();

    const paystack_data: PaystackPayI = {
      email: request.user.email,
      amount: created_order.amount_sold * 100,
      reference: created_order.order_id,
      metadata: created_order.products.toString(),
    };

    // lets  now move to paystack payment

    const paystack = PaymentIndex.paystack;
    const pay = new paystack();
    const init_pay = await pay.initialize(paystack_data);
    return response.redirect(
      HTTP_RESPONSE.CONTINUE,
      init_pay.data.authorization_url
    );
  } catch (error) {
    next(error);
  }
};

export const verifyOnlineSales = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 1) get the url message from  Paystack ✅done
  // 2) change the order status ✅done
  // 3) clear cart ✅done
  // 4) update order information ✅done
  // 5) alert the branch manager about the OrderTypeE ✅done
  // 6) create a review schema ✅done

  try {
    // get the body of the webhook from paystack
    const data = request.body.data;
    const get_ref = data.reference;

    //1) check and verify paystack reference and fetch the data
    const paystack = PaymentIndex.paystack;
    const pay = new paystack();
    const check_if_hash = pay.verifyPaystackHash(request.headers, request.body);
    if (!check_if_hash) throw APP_ERROR("this is not a valid paystack link");
    const check_paystack = await pay.verifyPayment(get_ref);
    const get_the_data = check_paystack.data.data;
    const get_trans_status: string = get_the_data.status;
    const order_id = get_the_data.reference;

    const find_one_order_with_ref_id = await ONLINE_ORDER.findOne({
      order_id,
    });

    if (find_one_order_with_ref_id) {
      //2) lets handle the failed aspect first because thats is easier

      switch (get_trans_status) {
        case "failed":
          {
            find_one_order_with_ref_id.payment_status = PaymentStatusE.DECLINED;
            const message = customMessage({
              information: "payment failed",
              title: "payment status",
              message_type: MessageTypeE.TEXT,
            });

            find_one_order_with_ref_id.message.push(message);
          }
          break;
        case "ongoing":
          find_one_order_with_ref_id.payment_status = PaymentStatusE.PROCESSING;
          break;
        case "abandoned":
          {
            find_one_order_with_ref_id.payment_status = PaymentStatusE.DECLINED;
            const message = customMessage({
              information: "payment cancelled by user",
              title: "payment failed",
              message_type: MessageTypeE.TEXT,
            });

            find_one_order_with_ref_id.message.push(message);
          }
          break;
        case "success":
          {
            find_one_order_with_ref_id.payment_status = PaymentStatusE.APPROVED;
            find_one_order_with_ref_id.order_status =
              OnlineOrderStatusE.PAYMENT_SUCCESSFUL;
            const message = customMessage({
              information: `thank you for your patronage \n your order id is :${order_id} \n preparing your package for shipping`,
              title: "payment process approved",
              message_type: MessageTypeE.TEXT,
            });
            find_one_order_with_ref_id.message.push(message);

            //b) send notification to the online branch admin
            // b.a) find the branches i.e online branches
            const get_branches = await BRANCH.find({
              branch_type: BranchTypeE.ONLINE,
            });
            const users = await USER.find({
              permissions: { $elemMatch: PermissionsE.HANDLE_ONLINE_ORDER },
            });
            //b.b lets gets staff members with this users
            const staffs: StaffI[] = [];
            for (const user of users) {
              const staff = await STAFF.findOne({ user: user.id });
              if (staff) {
                //send notification to staffs members
                await NOTIFICATION.create({
                  user: user.id,
                  message_type: MessageTypeE.TEXT,
                  title: `new online order with order_id: ${order_id} `,
                });
              }
            }

            // const find_online_staff_handlers = await STAFF.find()

            //c) update cart_order, remove cart items
            const products = find_one_order_with_ref_id.products;
            for (const cart_item of products) {
              //c.a remove from cart and update price
              const find_cart = await CART.findOne({
                user: find_one_order_with_ref_id.user.id,
              });
              if (find_cart) {
                const cart_product = find_cart.products.findIndex(
                  (prd) => prd.id === cart_item.product.id
                );
                const find_vat = await VAT.findOne({ vat_name: VatE.ONLINE });
                find_cart.products.splice(cart_product, 1);

                find_cart.total_price -= find_vat
                  ? n(cart_item.product_total_price) +
                    (n(cart_item.product_total_price) *
                      n(find_vat.vat_percentage)) /
                      100
                  : cart_item.product_total_price;
                find_cart.total_shipping_fee -= cart_item.shipping_fee;
                find_cart.vat -= find_vat
                  ? (n(cart_item.product_total_price) *
                      n(find_vat.vat_percentage)) /
                    100
                  : 0;

                find_cart.save();
              }

              await CART_ITEM.findOneAndDelete({
                product: cart_item.product.id,
              });
              //c.b) create user review and push the new review on the product so it can be fetched and displayed
              // get the user profile
              const user_profile = await PROFILE.findOne({
                user: find_one_order_with_ref_id.user.id,
              });
              // create review with user profile and product id
              if (user_profile) {
                const create_review = await REVIEW.create({
                  product: cart_item.product.id,
                  profile: user_profile.id,
                });
                // push the review created to the product reviews list
                const get_prod = await PRODUCT.findById(cart_item.product.id);
                get_prod?.reviews.push(create_review.id);
                get_prod?.save();
              }
            }
          }
          break;
        default:
          find_one_order_with_ref_id.payment_status = PaymentStatusE.PENDING;
      }

      switch (get_the_data.channel) {
        case "bank_transfer":
          find_one_order_with_ref_id.payment_method =
            PaymentMethodE.BANK_TRANSFERS;
          break;
        case "card":
          find_one_order_with_ref_id.payment_method =
            PaymentMethodE.CREDIT_CARD;
      }

      find_one_order_with_ref_id.save();
    }
  } catch (error) {
    next(error);
  }
};

export const acceptOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const accept_order_process = await ONLINE_ORDER.findById(request.params.id);

    if (accept_order_process) {
      if (
        request.user.id !== accept_order_process.handled_by.id &&
        accept_order_process.is_being_handled
      ) {
        // const find staff
        const staff = await STAFF.findOne({
          user: accept_order_process.handled_by,
        });
        throw APP_ERROR(
          `the order is being handled by ${staff?.first_name} ${staff?.last_name}`
        );
      }
      accept_order_process.is_being_handled = true;
      accept_order_process.handled_by = request.user.id;
      // send notification to staff about accepted order
      await NOTIFICATION.create({
        user: request.user.id,
        message_type: MessageTypeE.TEXT,
        title: `you have accepted to process the order `,
      });
      const message = customMessage({
        information: `your order is being packaged and awaiting for dispatch`,
        title: "order is being packaged",
        message_type: MessageTypeE.TEXT,
      });
      accept_order_process.order_status = OnlineOrderStatusE.ORDER_PACKAGED;
      accept_order_process.message.push(message);
      accept_order_process.save();
    }
  } catch (error) {
    next(error);
  }
};

export const processOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // const check the user first to see if its the person thats handling the request
    const find_order = await ONLINE_ORDER.findById(request.params.id);

    if (!find_order) throw APP_ERROR("the order id is not found");
    if (find_order.handled_by !== request.user.id)
      throw APP_ERROR("this staff is not authenticated to process this order");
    // send the user a notification,  a message and  staff
    find_order.is_ready_for_dispatch = true;
    find_order.order_status = OnlineOrderStatusE.ORDER_PACKAGED;
    // create a new dispatch order and send notification to users handling dispatch

    //a) create a dispatch query
    const new_dispatch = await DISPATCH.create({
      tracking_id: generateId(IdGenE.DISPATCH),
      order_id: find_order.order_id,
    });
    find_order.dispatch = new_dispatch.id;
    const dispatchers = await USER.find({
      permissions: { $elemMatch: PermissionsE.HANDLE_DISPATCH },
    });
    for (const dispatcher of dispatchers) {
      // check if its staff
      const staff = await STAFF.findOne({ user: dispatcher.id });
      if (!staff) throw APP_ERROR("not a staff");
      await NOTIFICATION.create({
        user: dispatcher.id,
        message_type: MessageTypeE.TEXT,
        title: `alert new order with ${find_order.order_id} is ready for dispatch`,
      });
    }
    await NOTIFICATION.create({
      user: request.user.id,
      message_type: MessageTypeE.TEXT,
      title: `you have created a dispatch order for ${find_order.order_id}`,
    });
    await NOTIFICATION.create({
      user: find_order.user,
      message_type: MessageTypeE.TEXT,

      title: `order ${find_order.order_id} is being dispatched`,
    });
    const message = customMessage({
      information: `your order is being packaged and awaiting for dispatch`,
      title: "order is being packaged",
      message_type: MessageTypeE.TEXT,
    });
    find_order.message.push(message);
    find_order.sold_by = request.user.id;
    find_order.save();
  } catch (error) {
    next(error);
  }
};

export const getOneOrderByStaff = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const crud_dispatch = new Crud(request, response, next);
    crud_dispatch.getOne<OnlineDocI>(
      {
        model: ONLINE_ORDER,
        exempt:
          "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
      },
      { id: request.params.id },
      { model: "dispatch", fields: "" }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneOrderByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const crud_dispatch = new Crud(request, response, next);
    crud_dispatch.getOne<OnlineDocI>(
      {
        model: ONLINE_ORDER,
        exempt:
          "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
      },
      { id: request.params.id },
      {
        model: "dispatch",
        fields:
          "order_id tracking_id dispatch_company dispatched_at delivery_status dispatcher_has_dispatched user_has_received",
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getManyOrderByStaff = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const crud_dispatch = new Crud(request, response, next);
    crud_dispatch.getMany<OnlineDocI>(
      {
        model: ONLINE_ORDER,
        exempt:
          "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
      },
      request.query,
      {},
      { model: "dispatch", fields: "" }
    );
  } catch (error) {
    next(error);
  }
};

export const getManyOrderByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const crud_dispatch = new Crud(request, response, next);
    crud_dispatch.getMany<OnlineDocI>(
      {
        model: ONLINE_ORDER,
        exempt:
          "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold -transfer_handling -branch -sold_BY -payment_status -handled_by  -user ",
      },
      request.query,
      { user: request.user.id },
      {
        model: "dispatch",
        fields:
          "order_id tracking_id dispatch_company dispatched_at delivery_status dispatcher_has_dispatched user_has_received",
      }
    );
  } catch (error) {
    next(error);
  }
};

export const transfer_order = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = request.body;
    const staff_id = body.staff_id;
    const find_staff = await STAFF.findById(staff_id);
    if (!find_staff) throw APP_ERROR("staff not found");

    const get_order = await ONLINE_ORDER.findById(request.params.id);
    if (!get_order) throw APP_ERROR("the order is not found");
    get_order.transfer_handling.push({
      acceptance_status: AcceptanceStatusE.PENDING,
      from: request.user.id,
      to: find_staff.user,
      time: new Date(),
    });
    await NOTIFICATION.create({
      user: find_staff.user,
      message_type: MessageTypeE.URL,
      title: "transfer order",
      information: `the kindly handle the transfer request of order id ${get_order.order_id}`,
    });
    get_order.save();
  } catch (error) {
    next(error);
  }
};

export const handle_transfer_order = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const get_order = await ONLINE_ORDER.findById(request.params.id);
    if (!get_order) throw APP_ERROR("the order is not found");
    const {
      status,
      staff_id,
    }: { status: AcceptanceStatusE; staff_id: Types.ObjectId } = request.body;
    const find_staff = await STAFF.findById(staff_id);
    if (!find_staff) throw APP_ERROR("staff not found");
    if (status === AcceptanceStatusE.ACCEPTED) {
      const find_transfer = get_order.transfer_handling.find(
        (t) =>
          t.to === request.user.id &&
          t.acceptance_status === AcceptanceStatusE.PENDING
      );
      if (!find_transfer) throw APP_ERROR("no transfer request available");
      find_transfer.acceptance_status = AcceptanceStatusE.ACCEPTED;
      get_order.handled_by = request.user.id;
    } else if (status === AcceptanceStatusE.REJECTED) {
      const find_transfer = get_order.transfer_handling.find(
        (t) =>
          t.to === request.user.id &&
          t.acceptance_status === AcceptanceStatusE.PENDING
      );
      if (!find_transfer) throw APP_ERROR("no transfer request available");
      find_transfer.acceptance_status = AcceptanceStatusE.REJECTED;
      get_order.handled_by = request.user.id;
    }

    get_order.save();
  } catch (error) {
    next(error);
  }
};

// get all orders by staff
// get all orders by admin
// get one order by staff
// get all order by user
