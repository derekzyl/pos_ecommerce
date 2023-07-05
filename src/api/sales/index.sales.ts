import { Router } from "express";
import posRouter from "./pos/main_pos/route.pos";

const salesRouter = Router();

salesRouter.use("/pos", posRouter);

export default salesRouter;
