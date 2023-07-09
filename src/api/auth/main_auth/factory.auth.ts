import { USER } from "./model.auth";
import { createHash, randomBytes } from "crypto";

import { Request } from "express";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { dataI } from "../../../utilities/interface_utilities/mail.interface";
import NodeMailer from "../../../utilities/mailer";
import BCRYPT from "../../../utilities/bcrypt";
import JWT from "../../../utilities/jwt";
import { PROFILE } from "../../user/profile/main_profile/model.profile";
import { WISHLIST } from "../../user/wishlist/main_wishlist/model.wishlist";
import { CART } from "../../user/cart/main_cart/model.cart";
import { CreateUserT, UserI } from "../interface_auth/interface.auth";
import {
  email_regex,
  password_regex,
  phone_regex,
} from "../../../utilities/regex";

export async function signupFactory(request: Request, body: CreateUserT) {
  const { email, password, confirm_password, phone }: CreateUserT = body;

  if (!phone_regex.test(phone))
    throw APP_ERROR("invalid phone number", HTTP_RESPONSE.BAD_REQUEST);
  if (!email) {
    throw APP_ERROR("Email is required", HTTP_RESPONSE.BAD_REQUEST);
  }
  if (!email_regex.test(email)) {
    throw APP_ERROR("Email is invalid", HTTP_RESPONSE.BAD_REQUEST);
  }
  const user = await USER.findOne({ email });

  if (user) {
    throw APP_ERROR("User already exists", HTTP_RESPONSE.BAD_REQUEST);
  }
  if (!password || !confirm_password) {
    throw APP_ERROR("Password is required", HTTP_RESPONSE.BAD_REQUEST);
  }
  if (password !== confirm_password) {
    throw APP_ERROR("Passwords do not match", HTTP_RESPONSE.BAD_REQUEST);
  }
  if (password.length < 8) {
    throw APP_ERROR(
      "Password must be at least 8 characters",
      HTTP_RESPONSE.BAD_REQUEST
    );
  }
  if (!password_regex.test(password)) {
    throw APP_ERROR(
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
      HTTP_RESPONSE.BAD_REQUEST
    );
  }
  const encryptedPassword = await BCRYPT.hash(password);

  const pRT = "email-" + randomBytes(20).toString("hex");

  const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;
  const resetToken = createHash("sha256").update(pRT).digest("hex");

  const token_expires = new Date(resetTokenExpiry);

  const url = `${request.protocol}://${request.get(
    "host"
  )}/api/v1/auth/verifyEmail/${pRT}`;
  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. \n Please make a POST request to: ${url}`;

  const details: dataI = {
    to: `${email}`,
    subject: "Password reset token is valid for 1 hour",
    text: message,
  };
  const nodeMailer = new NodeMailer();
  nodeMailer.mailer(details);

  const newUser = new USER({
    email,
    phone,
    password: encryptedPassword,
    token: resetToken,
    token_expires,
    role: "644da36acc996fe2be8239e9",
  });
  const newUSER = await newUser.save();

  const create_profile = new PROFILE({
    user: newUSER.id,
    profile_image:
      "https://res.cloudinary.com/cybergenii/image/upload/v1688016348/Asset_2_mfttzm.png",
  });
  const create_wishlist = new WISHLIST({
    user: newUSER.id,
    products: [],
  });
  const create_cart = new CART({
    user: newUSER.id,
    total_price: 0,
    total_shipping_fee: 0,
    sub_total: 0,
    vat: 0,
    products: [],
  });
  await create_profile.save();
  await create_wishlist.save();
  await create_cart.save();
  const expire = process.env.JWT_EXPIRE || "1d";
  const token = JWT.generateToken({ id: newUSER._id }, { expiresIn: expire });

  const data: { token: string; newUSER: UserI } = { token, newUSER };
  return {
    ...data,
  };
}

export async function protectorFunction(request: Request) {
  const token = request.headers.authorization;
  if (!token) {
    throw APP_ERROR("Token is required", HTTP_RESPONSE.BAD_REQUEST);
  }
  const tokenData = token.split(" ")[1];
  const decoded = await JWT.verifyToken(tokenData);
  if (!decoded) {
    throw APP_ERROR("Token is invalid", HTTP_RESPONSE.BAD_REQUEST);
  }

  const user = await USER.findById(decoded.id);

  if (!user) {
    throw APP_ERROR("User does not exist", HTTP_RESPONSE.BAD_REQUEST);
  }
  if (user.is_deleted) {
    throw APP_ERROR(
      "User does not exist, please kindly register   ",
      HTTP_RESPONSE.BAD_REQUEST
    );
  }
  // if (!user.is_email_verified) {
  //   throw APP_ERROR("email not verified, kindly go to your mail to verify");
  // }

  return user;
}
