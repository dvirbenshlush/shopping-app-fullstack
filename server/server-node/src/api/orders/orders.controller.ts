import { Request, Response, NextFunction } from "express";
import * as ordersService from "./orders.service";

export const confirmOrder = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, address, email, items } = req.body;
    const orderSummary = await ordersService.confirmOrder({ firstName, lastName, address, email }, items);
    res.json(orderSummary);
  } catch (err) {
    next(err);
  }
}
