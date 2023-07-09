import { Router } from "express";
import posRouter from "./pos/main_pos/route.pos";
import onlineSalesRouter from "./online/main_online/route.online";

const salesRouter = Router();

salesRouter.use("/pos", posRouter);
salesRouter.use("/online", onlineSalesRouter);

export default salesRouter;
