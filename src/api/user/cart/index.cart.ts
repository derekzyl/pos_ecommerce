import {
  addCart,
  removeCart,
  getCart,
  updateCartWithAddress,
  clearCart,
} from "./main_cart/controller.cart";

class Cart {
  public add_cart = addCart;
  public remove_cart = removeCart;
  public get_cart = getCart;
  public clear_cart = clearCart;

  public update_cart_with_address = updateCartWithAddress;
}
export const CartIndex = new Cart();
