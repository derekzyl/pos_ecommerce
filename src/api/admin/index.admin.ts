import { Router } from "express";
import branchRouter from "./branch/main_branch/route.branch";
import roleRouter from "./role/main_role/route.role";
import staffRouter from "./staff/main_staff/route.staff";
import {
  categoryRouter,
  subCategoryRouter,
} from "./category/main_category/route.category";
import vatRouter from "./vat/main_vat/route.vat";
import shippingRouter from "./shipping/main_shipping/route.role";
import dispatchRouter from "./dispatch/main_dispatch/route.dispatch";
import {
  campaignRouter,
  sliderRouter,
} from "../frontend/campaigns/main_campaign/route.campaign";

const adminRouter = Router();

adminRouter.use("/branch", branchRouter);
adminRouter.use("/role", roleRouter);
adminRouter.use("/staff", staffRouter);
adminRouter.use("/category", categoryRouter);
adminRouter.use("/sub-category", subCategoryRouter);
adminRouter.use("/vat", vatRouter);
adminRouter.use("/shipping", shippingRouter);
adminRouter.use("/dispatch", dispatchRouter);
adminRouter.use("/campaign", campaignRouter);
adminRouter.use("/slider", sliderRouter);

export default adminRouter;
