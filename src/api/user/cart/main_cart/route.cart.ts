import { Router } from "express";
import { CartIndex } from "../index.cart";
import { AuthIndex } from "../../../auth/index.auth";

const cartRouter = Router();
cartRouter
  .route("/")

  .get(AuthIndex.protector, CartIndex.get_cart);
cartRouter.route("/add/:id").patch(AuthIndex.protector, CartIndex.add_cart);
cartRouter
  .route("/remove/:id")
  .delete(AuthIndex.protector, CartIndex.remove_cart);
cartRouter
  .route("/update-cart-with-address/:id")
  .patch(AuthIndex.protector, CartIndex.update_cart_with_address);

cartRouter
  .route("/clear/cart")
  .delete(AuthIndex.protector, CartIndex.clear_cart);
export default cartRouter;
