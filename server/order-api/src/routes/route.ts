import { Router } from "express";
import ordersRouter from "../api/orders/orders.route";

const router = Router();

router.use("/orders", ordersRouter);

export default router;
