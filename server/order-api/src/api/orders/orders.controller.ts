import { Request, Response, NextFunction } from "express";
import * as ordersService from "./orders.service";

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await ordersService.fetchCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryId = req.params.categoryId;
    const products = await ordersService.fetchProductsByCategory(categoryId);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function addProductToCart(req: Request, res: Response, next: NextFunction) {
  try {
    const { productId, quantity } = req.body;
    const cart = await ordersService.addToCart(productId, quantity);
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await ordersService.getCart();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

export async function confirmOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, address, email } = req.body;
    const orderSummary = await ordersService.confirmOrder({ firstName, lastName, address, email });
    res.json(orderSummary);
  } catch (err) {
    next(err);
  }
}
