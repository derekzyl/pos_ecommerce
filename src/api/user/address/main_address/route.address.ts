import { Router } from "express";
import { AddressIndex } from "../index.address";
import { AuthIndex } from "../../../auth/index.auth";
import { ShippingIndex } from "../../../admin/shipping/index.shipping";

const addressRouter = Router();
addressRouter
  .route("/")
  .post(AuthIndex.protector, AddressIndex.createAddress)
  .get(AuthIndex.protector, AddressIndex.getAllAddress);
addressRouter
  .route("/:id")
  .get(AuthIndex.protector, AddressIndex.getOneAddress)
  .patch(AuthIndex.protector, AddressIndex.updateAddress)
  .delete(AuthIndex.protector, AddressIndex.deleteAddress);

addressRouter
  .route("/getCountryAndState")
  .get(AuthIndex.protector, ShippingIndex.fetch_country_and_state);
export default addressRouter;
