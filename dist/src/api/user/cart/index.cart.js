"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartIndex = void 0;
const controller_cart_1 = require("./main_cart/controller.cart");
class Cart {
    add_cart = controller_cart_1.addCart;
    remove_cart = controller_cart_1.removeCart;
    get_cart = controller_cart_1.getCart;
    clear_cart = controller_cart_1.clearCart;
    update_cart_with_address = controller_cart_1.updateCartWithAddress;
}
exports.CartIndex = new Cart();
