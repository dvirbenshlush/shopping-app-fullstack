import { Router } from "express";
import ordersRouter from "./orders.route";

const router = Router();

router.use("/orders", ordersRouter);

export default router;
