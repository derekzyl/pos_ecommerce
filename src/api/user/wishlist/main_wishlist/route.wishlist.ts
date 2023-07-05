import { Router } from "express";
import { WishlistIndex } from "../index.wishlist";
import { AuthIndex } from "../../../auth/index.auth";

const wishlistRouter = Router();
wishlistRouter
  .route("/")

  .get(AuthIndex.protector, WishlistIndex.get_wishlist);
wishlistRouter
  .route("/add/:id")
  .post(AuthIndex.protector, WishlistIndex.add_wishlist);
wishlistRouter
  .route("/remove/:id")
  .patch(AuthIndex.protector, WishlistIndex.remove_wishlist);
export default wishlistRouter;
