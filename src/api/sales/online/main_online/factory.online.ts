import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import {
  AcceptanceStatusE,
  MessageT,
  MessageTypeE,
  OnlineBodyT,
  OnlineI,
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
import { UserI } from "../../../auth/interface_auth/interface.auth";

// 1) create a post online order ✅done
// 2) the dispatch rider should be able to maintain the messages on the order dispatch update
// 3) update general update status with update clearance
// 4) get all orders by staff
// 5) get all orders by user
// 6) get one order by staff or user
// 7) customer should be able to review product after purchase ✅done
// meaning we can create a new review of the product and review it ✅done

export async function handleCheckOut(body: OnlineBodyT, user: UserI) {
  try {
    // 1.1) get the request body

    // 1.2 find if the user has any address at all
    const find_address = await ADDRESS.find({ user: user.id });
    if (!find_address)
      throw APP_ERROR("No address found", HTTP_RESPONSE.BAD_REQUEST);
    // 1.3  get the user default address
    // find if the user has a default address
    let user_address = await ADDRESS.findOne({
      user: user.id,
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
      user: user.id,
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
      email: user.email,
      amount: created_order.amount_sold * 100,
      reference: created_order.order_id,
      metadata: created_order.products.toString(),
    };

    // lets  now move to paystack payment

    const paystack = PaymentIndex.paystack;
    const pay = new paystack();
    const init_pay = await pay.initialize(paystack_data);
    return init_pay.data.authorization_url;
  } catch (error: any) {
    throw APP_ERROR(error);
  }
}
