import { Router } from "express";
import { confirmOrder } from "./orders.controller";

const router = Router();

router.post("/confirm", confirmOrder);

export default router;