import { Router } from "express";
import { ShippingIndex } from "../admin/shipping/index.shipping";
import exp from "constants";

const generalRouter = Router();

generalRouter
  .route("/location/country-state")
  .get(ShippingIndex.fetch_country_and_state);

export default generalRouter;
