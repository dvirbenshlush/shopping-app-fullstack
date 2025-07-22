import { Router } from "express";
import { getCategories, getProductsByCategory, addProductToCart, getCart, confirmOrder } from "../controllers/orders.controller";

const router = Router();

// 1. רשימת קטגוריות ומוצרים
router.get("/categories", getCategories);

// 2. מוצרים לפי קטגוריה
router.get("/categories/:categoryId/products", getProductsByCategory);

// 3. הוספת מוצר לסל
router.post("/cart", addProductToCart);

// 4. קבלת התכולה בסל
router.get("/cart", getCart);

// 5. אישור הזמנה עם פרטים
router.post("/confirm", confirmOrder);

export default router;
// C:\Users\97252\Desktop\shopping-app-fullstack\server\order-api\docs\swagger\categories.yaml
// C:\Users\97252\Desktop\shopping-app-fullstack\server\order-api\src\docs\swagger\categories.yaml