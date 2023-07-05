import { NextFunction, Response, Request } from "express";
import { Types } from "mongoose";

import { CART, CART_ITEM } from "./model.cart";
import { PRODUCT } from "../../../product/main_product/model.product";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../../utilities/http_response";
import { responseMessage } from "../../../../utilities/response_message";
import { Crud } from "../../../general_factory/crud";
import { ADDRESS } from "../../address/main_address/model.address";
import { VAT } from "../../../admin/vat/main_vat/model.vat";
import { VatE } from "../../../admin/vat/interface_vat/interface.vat";
import { SHIPPING } from "../../../admin/shipping/main_shipping/model.shipping";
import { CartDocI } from "../interface_cart/interface.cart";
import { calculateAddressFee } from "../../../sales/online/main_online/service.online";
import { n } from "../../../../utilities/number_checker";
import { networkInterfaces } from "os";

//todo address receipt

export const addCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // 1) get product with request parameters
    const id = request.params.id;
    const get_product = await PRODUCT.findById(id);
    if (!get_product) {
      throw APP_ERROR("product not found sorry", HTTP_RESPONSE.NOT_FOUND);
    }
    // 2) get user information
    const user = request.user.id;

    // 3) find cart information
    let total_price = 0;
    let sub_total = 0;
    const get_cart = await CART.findOne({ user: user });
    if (!get_cart) throw APP_ERROR(" cart is not found");

    // 4) find default user address
    const find_user_default_address = await ADDRESS.findOne({
      user: user,
      is_default: true,
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
    console.log();
    if (state_fee) state_fee = n(state_fee.state_shipping_fee);
    //7) get vat
    const find_vat = await VAT.findOne({ vat_name: VatE.ONLINE });
    if (!find_vat) ""; /*throw  APP_ERROR(" vat is not found")*/

    //8) find product in cart
    const cart_item = await CART_ITEM.findOne({
      product: get_product.id,
      cart_id: get_cart.id,
    });

    if (cart_item) {
      cart_item.product_total_count = cart_item.product_total_count + 1;
      cart_item.product_total_price += get_product.discount_percentage
        ? n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100
        : n(get_product.price);

      cart_item.shipping_fee +=
        find_user_default_address && find_shipping_fee ? n(state_fee) : 0;

      const price = get_product.discount_percentage
        ? n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100
        : n(get_product.price);

      const total_product_price =
        find_user_default_address && find_shipping_fee
          ? n(state_fee) + n(price)
          : n(price);

      sub_total = price;
      total_shipping_fee =
        find_user_default_address && find_shipping_fee ? n(state_fee) : 0;
      total_price = total_product_price;
      cart_item.save();
    } else {
      const create_new_cart_item = new CART_ITEM({
        product: get_product.id,
        product_total_count: 1,
        product_total_price: get_product.discount_percentage
          ? get_product.price -
            (get_product.price * get_product.discount_percentage) / 100
          : get_product.price,
        shipping_fee:
          find_user_default_address && find_shipping_fee ? state_fee : 0,
        cart_id: get_cart.id,
      });

      const get_cart_item = await create_new_cart_item.save();

      total_shipping_fee =
        find_user_default_address && find_shipping_fee ? n(state_fee) : 0;

      const price = get_product.discount_percentage
        ? n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100
        : n(get_product.price);

      const total_product_price =
        find_user_default_address && find_shipping_fee
          ? n(state_fee) + n(price)
          : n(price);
      total_price = total_product_price;
      sub_total = n(price);
      get_cart.products.push(get_cart_item.id);
    }
    const get_vat = await VAT.findOne({ vat_name: VatE.ONLINE });

    get_cart.total_price += get_vat?.vat_percentage
      ? n(total_price + (sub_total * Number(get_vat.vat_percentage)) / 100)
      : n(total_price);
    get_cart.total_shipping_fee += n(total_shipping_fee);
    get_cart.sub_total += n(sub_total);
    get_cart.vat += get_vat?.vat_percentage
      ? n((n(sub_total) * n(get_vat?.vat_percentage)) / 100)
      : 0;

    get_cart.save();

    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: `${get_product.name} added successfully to cart ${
          find_user_default_address && find_shipping_fee
            ? ""
            : "add your address before checkout because address missing"
        }`,
        message: "added successfully",
        success_status: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const removeCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // 1) get product with request parameters
    const id = request.params.id;
    const get_product = await PRODUCT.findById(id);
    if (!get_product) {
      throw APP_ERROR("product not found sorry", HTTP_RESPONSE.NOT_FOUND);
    }
    // 2) get user information
    const user = request.user.id;

    // 3) find cart information
    let total_price = 0;
    let sub_total = 0;
    const get_cart = await CART.findOne({ user: user }).populate("products");
    if (!get_cart) throw APP_ERROR("no cart found");

    // 4) find default user address
    const find_user_default_address = await ADDRESS.findOne({
      user: user,
      is_default: true,
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
    if (state_fee) state_fee = state_fee.state_shipping_fee;
    //7) get vat
    const get_vat = await VAT.findOne({ vat_name: VatE.ONLINE });

    //8) find product in cart

    //8) find product in cart

    const cart_item = await CART_ITEM.findOne({
      product: get_product.id,
      cart_id: get_cart.id,
    });
    if (!cart_item) throw APP_ERROR("item not found in cart");
    if (cart_item?.product_total_count > 1) {
      cart_item.product_total_count = cart_item.product_total_count - 1;
      cart_item.product_total_price -= get_product.discount_percentage
        ? n(get_product.price) +
          (n(get_product.price) * get_product.discount_percentage) / 100
        : n(get_product.price);
      cart_item.shipping_fee -=
        find_user_default_address && find_shipping_fee
          ? cart_item.product_total_count * state_fee
          : 0;
      const price = get_product.discount_percentage
        ? n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100
        : n(get_product.price);

      const total_product_price =
        find_user_default_address && find_shipping_fee
          ? n(state_fee) + n(price)
          : n(price);

      sub_total = price;
      total_shipping_fee =
        find_user_default_address && find_shipping_fee ? n(state_fee) : 0;
      total_price = n(total_product_price);
      cart_item.save();
    } else {
      const price = get_product.discount_percentage
        ? n(get_product.price) -
          (n(get_product.price) * n(get_product.discount_percentage)) / 100
        : n(get_product.price);

      const total_product_price =
        find_user_default_address && find_shipping_fee
          ? n(state_fee) + n(price)
          : n(price);

      sub_total = price;
      total_shipping_fee =
        find_user_default_address && find_shipping_fee ? n(state_fee) : 0;
      total_price = n(total_product_price);
      const find_product_index = get_cart.products.findIndex(
        (p) => p.id === get_product.id
      );
      get_cart.products.splice(find_product_index, 1);
      await CART_ITEM.findByIdAndDelete(cart_item.id);
    }

    get_cart.total_price -= get_vat?.vat_percentage
      ? n(total_price + (sub_total * Number(get_vat.vat_percentage)) / 100)
      : n(total_price);
    get_cart.total_shipping_fee -= n(total_shipping_fee);
    get_cart.sub_total -= n(sub_total);
    get_cart.vat -= get_vat?.vat_percentage
      ? n((n(sub_total) * n(get_vat?.vat_percentage)) / 100)
      : 0;

    get_cart.save();

    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: `${get_product.name} removed successfully from cart ${
          find_user_default_address && find_shipping_fee
            ? ""
            : "add your address before checkout because address missing"
        }`,
        message: "removed successfully",
        success_status: true,
      })
    );
  } catch (error) {
    next(error);
  }
};
export const getCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const get_crud = new Crud(request, response, next);
    await get_crud.getOne<CartDocI>(
      { model: CART, exempt: "-user" },
      { user: request.user.id },
      { model: "products" }
    );
  } catch (error) {
    next(error);
  }
};

export const updateCartWithAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const get_cart = await CART.findOne({
      user: request.user._id,
    });
    if (!get_cart)
      throw APP_ERROR(
        "Cart not found developer error",
        HTTP_RESPONSE.BAD_REQUEST
      );

    const get_address_id = request.params.id;

    const get_address = await ADDRESS.findById(get_address_id);
    if (!get_address)
      throw APP_ERROR(
        "Address not found developer error",
        HTTP_RESPONSE.BAD_REQUEST
      );
    let total_price = 0;
    let total_shipping_fee = 0;
    let sub_total = 0;

    // 1) we find all cart item first,

    const get_cart_items = await CART_ITEM.find({
      cart_id: get_cart.id,
    });

    // 1.1) check if the length is more than 0
    if (get_cart_items.length > 0) {
      // 1.2) get the shipping fee
      const get_shipping_fee = await calculateAddressFee(get_address.id);

      for (const cart_item of get_cart_items) {
        // 2) do all calculations in the loop

        // 2.1) get cart by the id in the loop
        const get_cart_item = await CART_ITEM.findById(cart_item.id).populate(
          "product"
        );
        if (!get_cart_item)
          throw APP_ERROR("cart item not found", HTTP_RESPONSE.BAD_REQUEST);
        // 2.2 get product details from cart item id
        const get_product = await PRODUCT.findById(get_cart_item.product);
        if (!get_product)
          throw APP_ERROR("product not found", HTTP_RESPONSE.BAD_REQUEST);

        // 2.3) get cart item price and count
        get_cart_item.product_total_price = get_product.discount_percentage
          ? n(get_product.price) -
            (n(get_product.price) * n(get_product.discount_percentage)) / 100
          : n(get_product.price);
        get_cart_item.shipping_fee =
          n(get_shipping_fee) * n(get_cart_item.product_total_count);
        // 3) we calculate for the total cart price say hurray

        total_shipping_fee += n(get_cart_item.shipping_fee);
        total_price +=
          n(get_cart_item.shipping_fee) + n(get_cart_item.product_total_price);
        sub_total += n(get_cart_item.product_total_price);

        get_cart_item.save();
      }
      // 4) lastly lets find vat
      const get_vat = await VAT.findOne({ vat_name: VatE.ONLINE });
      get_cart.total_price = n(total_price);
      get_cart.sub_total = n(sub_total);
      get_cart.total_shipping_fee = n(total_shipping_fee);
      get_cart.vat = get_vat?.vat_percentage
        ? n((n(sub_total) * n(get_vat?.vat_percentage)) / 100)
        : 0;
    }
    get_cart.save();
    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: `address updated successfully`,
        message: "address updated successfully",
        success_status: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const cart = await CART.findOne({ user: request.user.id });
    if (!cart) throw APP_ERROR("cart not found");

    await CART_ITEM.deleteMany({ cart_id: cart.id });
    cart.products = [];
    cart.total_price = 0;
    cart.total_shipping_fee = 0;
    cart.sub_total = 0;
    cart.vat = 0;
    cart.save();
    return response.status(HTTP_RESPONSE.OK).json(
      responseMessage({
        data: "cart emptied successfully",
        message: "cart cleared",
        success_status: true,
      })
    );
  } catch (error) {
    next(error);
  }
};
