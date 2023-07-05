import { Router } from "express";
import addressRouter from "./address/main_address/route.address";
import profileRouter from "./profile/main_profile/route.profile";
import wishlistRouter from "./wishlist/main_wishlist/route.wishlist";
import userDispatchRouter from "./general_user_api/routes.user.ts/dispatch.route.user";
import cartRouter from "./cart/main_cart/route.cart";

const userRouter = Router();

userRouter.use("/address", addressRouter);
userRouter.use("/profile", profileRouter);
userRouter.use("/wishlist", wishlistRouter);
userRouter.use("/dispatch", userDispatchRouter);
userRouter.use("/cart", cartRouter);

export default userRouter;
