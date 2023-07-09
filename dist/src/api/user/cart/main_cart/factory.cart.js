"use strict";
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCartFunction = void 0;
const model_cart_1 = require("./model.cart");
const model_product_1 = require("../../../product/main_product/model.product");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const model_address_1 = require("../../address/main_address/model.address");
const model_vat_1 = require("../../../admin/vat/main_vat/model.vat");
const interface_vat_1 = require("../../../admin/vat/interface_vat/interface.vat");
const model_shipping_1 = require("../../../admin/shipping/main_shipping/model.shipping");
const number_checker_1 = require("../../../../utilities/number_checker");
async function addCartFunction(products, user) {
    // 1) get product with request parameters
    // 2) get user information
    // 3) find cart information
    let total_price = 0;
    let sub_total = 0;
    const get_cart = await model_cart_1.CART.findOne({ user: user.id });
    if (!get_cart)
        throw (0, custom_error_1.APP_ERROR)(" cart is not found");
    // 4) find default user address
    const find_user_default_address = await model_address_1.ADDRESS.findOne({
        user: user,
    });
    // 5) find shipping fee
    let total_shipping_fee = 0;
    const find_shipping_fee = await model_shipping_1.SHIPPING.findOne({
        country: find_user_default_address?.country,
    });
    //6) get state fee
    let state_fee;
    if (find_shipping_fee)
        state_fee = find_shipping_fee.states.find((state) => state.name === find_user_default_address?.state);
    if (state_fee)
        state_fee = (0, number_checker_1.n)(state_fee.state_shipping_fee);
    //7) get vat
    const find_vat = await model_vat_1.VAT.findOne({ vat_name: interface_vat_1.VatE.ONLINE });
    if (!find_vat)
        ""; /*throw  APP_ERROR(" vat is not found")*/
    const check_address_and_shipping = find_user_default_address && find_shipping_fee ? true : false;
    //8) find product in cart
    for (const product of products) {
        const created_cart = await createCartItem(product, check_address_and_shipping, state_fee, get_cart);
        total_shipping_fee +=
            find_user_default_address && find_shipping_fee
                ? (0, number_checker_1.n)(state_fee) * (0, number_checker_1.n)(created_cart.product_total_count)
                : 0;
        total_price +=
            (0, number_checker_1.n)(created_cart.product_total_price) + (0, number_checker_1.n)(created_cart.shipping_fee);
        sub_total += (0, number_checker_1.n)(created_cart.product_total_price);
        get_cart.products.push(created_cart.id);
    }
    const get_vat = await model_vat_1.VAT.findOne({ vat_name: interface_vat_1.VatE.ONLINE });
    get_cart.total_price = get_vat?.vat_percentage
        ? (0, number_checker_1.n)(total_price + (sub_total * Number(get_vat.vat_percentage)) / 100)
        : (0, number_checker_1.n)(total_price);
    get_cart.total_shipping_fee = (0, number_checker_1.n)(total_shipping_fee);
    get_cart.sub_total = (0, number_checker_1.n)(sub_total);
    get_cart.vat = get_vat?.vat_percentage
        ? (0, number_checker_1.n)(((0, number_checker_1.n)(sub_total) * (0, number_checker_1.n)(get_vat?.vat_percentage)) / 100)
        : 0;
    get_cart.save();
    return get_cart.products;
}
exports.addCartFunction = addCartFunction;
async function createCartItem(product, check_address_and_shipping, state_fee, get_cart) {
    const get_product = await model_product_1.PRODUCT.findById(product.product);
    if (!get_product) {
        throw (0, custom_error_1.APP_ERROR)("product not found sorry", http_response_1.HTTP_RESPONSE.NOT_FOUND);
    }
    const create_new_cart_item = new model_cart_1.CART_ITEM({
        product: get_product.id,
        product_total_count: product.product_total_count,
        product_total_price: get_product.discount_percentage
            ? ((0, number_checker_1.n)(get_product.price) -
                ((0, number_checker_1.n)(get_product.price) * (0, number_checker_1.n)(get_product.discount_percentage)) / 100) *
                (0, number_checker_1.n)(product.product_total_count)
            : (0, number_checker_1.n)(get_product.price) * (0, number_checker_1.n)(product.product_total_count),
        shipping_fee: check_address_and_shipping
            ? state_fee * product.product_total_count
            : 0,
        cart_id: get_cart.id,
    });
    const get_cart_item = await create_new_cart_item.save();
    return get_cart_item;
}
