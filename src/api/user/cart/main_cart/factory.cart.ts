/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Types } from "mongoose";

import { CART, CART_ITEM } from "./model.cart";
import { PRODUCT } from "../../../product/main_product/model.product";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { responseMessage } from "../../../../utilities/response_message";
import { ADDRESS } from "../../address/main_address/model.address";
import { VAT } from "../../../admin/vat/main_vat/model.vat";
import { VatE } from "../../../admin/vat/interface_vat/interface.vat";
import { SHIPPING } from "../../../admin/shipping/main_shipping/model.shipping";
import { n } from "../../../../utilities/number_checker";
import {
  CartDocI,
  CartItemDocI,
  ProductAndCount,
} from "../interface_cart/interface.cart";
import { UserI } from "../../../auth/interface_auth/interface.auth";

export async function addCartFunction(
  products: Pick<ProductAndCount, "product" | "product_total_count">[],
  user: UserI
) {
  // 1) get product with request parameters

  // 2) get user information

  // 3) find cart information
  let total_price = 0;
  let sub_total = 0;
  const get_cart = await CART.findOne({ user: user.id });
  if (!get_cart) throw APP_ERROR(" cart is not found");

  // 4) find default user address
  const find_user_default_address = await ADDRESS.findOne({
    user: user,
  });

  // 5) find shipping fee
  let total_shipping_fee = 0;
  const find_shipping_fee = await SHIPPING.findOne({
    country: find_user_default_address?.country,
  });

  //6) get state fee
  let state_fee: any;
  if (find_shipping_fee)
    state_fee = find_shipping_fee.states.find(
      (state) => state.name === find_user_default_address?.state
    );

  if (state_fee) state_fee = n(state_fee.state_shipping_fee);
  //7) get vat
  const find_vat = await VAT.findOne({ vat_name: VatE.ONLINE });
  if (!find_vat) ""; /*throw  APP_ERROR(" vat is not found")*/

  const check_address_and_shipping: boolean =
    find_user_default_address && find_shipping_fee ? true : false;

  //8) find product in cart
  for (const product of products) {
    const created_cart = await createCartItem(
      product,
      check_address_and_shipping,
      state_fee,
      get_cart
    );

    total_shipping_fee +=
      find_user_default_address && find_shipping_fee
        ? n(state_fee) * n(created_cart.product_total_count)
        : 0;

    total_price +=
      n(created_cart.product_total_price) + n(created_cart.shipping_fee);
    sub_total += n(created_cart.product_total_price);
    get_cart.products.push(created_cart.id);
  }

  const get_vat = await VAT.findOne({ vat_name: VatE.ONLINE });

  get_cart.total_price = get_vat?.vat_percentage
    ? n(total_price + (sub_total * Number(get_vat.vat_percentage)) / 100)
    : n(total_price);
  get_cart.total_shipping_fee = n(total_shipping_fee);
  get_cart.sub_total = n(sub_total);
  get_cart.vat = get_vat?.vat_percentage
    ? n((n(sub_total) * n(get_vat?.vat_percentage)) / 100)
    : 0;

  get_cart.save();

  return get_cart.products;
}

async function createCartItem(
  product: Pick<ProductAndCount, "product" | "product_total_count">,
  check_address_and_shipping: boolean,
  state_fee: number,
  get_cart: CartDocI
) {
  const get_product = await PRODUCT.findById(product.product);
  if (!get_product) {
    throw APP_ERROR("product not found sorry", HTTP_RESPONSE.NOT_FOUND);
  }

  const create_new_cart_item = new CART_ITEM({
    product: get_product.id,
    product_total_count: product.product_total_count,
    product_total_price: get_product.discount_percentage
      ? (n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100) *
        n(product.product_total_count)
      : n(get_product.price) * n(product.product_total_count),
    shipping_fee: check_address_and_shipping
      ? state_fee * product.product_total_count
      : 0,
    cart_id: get_cart.id,
  });

  const get_cart_item = await create_new_cart_item.save();
  return get_cart_item;
}
