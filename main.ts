import express, { Express } from "express";

import { errorCenter } from "./src/utilities/custom_error";

import authRouter from "./src/api/auth/main_auth/route.auth";
import adminRouter from "./src/api/admin/index.admin";
import reviewRouter from "./src/api/review/main_review/route.review";
import productRouter from "./src/api/product/main_product/route.product";
import salesRouter from "./src/api/sales/index.sales";
import userRouter from "./src/api/user/index.user";
import testRouter from "./src/api/test/main_test/route.t";
import notificationRouter from "./src/api/notification/main_notification/route.notification";
import generalRouter from "./src/api/general_factory/route.general";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import authLimiter from "./src/utilities/rate_limiter";

import compression from "compression";
dotenv.config();

const app: Express = express();

// security adding and implemnentations
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());
app.get("/home", (req, res) => {
  res.status(200).json({ hey: "welcome to jenny glow backend" });
});
// limit repeated failed requests to auth endpoints
if (process.env.environment === "production") {
  app.use("/api/v1/auth", authLimiter);
}
app.use("/test", testRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/product", productRouter);
app.use("/sales", salesRouter);
app.use("/user", userRouter);
app.use("/gen", generalRouter);
app.use("/notification", notificationRouter);

// });
app.use(errorCenter);
export default app;
