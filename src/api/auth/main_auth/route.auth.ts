import { Router } from "express";
import { AuthIndex } from "../index.auth";

const authRouter = Router();

authRouter.route("/signup").post(AuthIndex.signup);
authRouter.route("/login").post(AuthIndex.login);
authRouter.route("/forgot_password").post(AuthIndex.forgot_password);
authRouter.route("/reset_password").post(AuthIndex.reset_password);
authRouter.route("/update_password").post(AuthIndex.update_password);
authRouter.route("/verify_email/:token-reset").post(AuthIndex.verify_email);

export default authRouter;
