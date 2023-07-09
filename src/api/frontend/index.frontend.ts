import { Router } from "express";
import {
  campaignRouterF,
  sliderRouterF,
} from "./campaigns/main_campaign/route.campaign";

const frontRouter = Router();

frontRouter.use("/campaign", campaignRouterF);
frontRouter.use("/slides", sliderRouterF);
export default frontRouter;
