import { OrderSummary } from "../../models/order.model";
import { Client } from "@opensearch-project/opensearch";

const client = new Client({
  node: process.env.OPENSEARCH_NODE || "http://localhost:9200"
});


let cart: { productId: string; quantity: number }[] = [];

const categories = [
  { id: "1", name: "פירות" },
  { id: "2", name: "ירקות" },
];

const products = [
  { id: "a", categoryId: "1", name: "תפוח" },
  { id: "b", categoryId: "1", name: "בננה" },
  { id: "c", categoryId: "2", name: "גזר" },
  { id: "d", categoryId: "2", name: "מלפפון" },
];

export async function fetchCategories() {
  return categories;
}

export async function fetchProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export async function addToCart(productId: string, quantity: number) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  return cart;
}

export async function getCart() {
  return cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      name: product?.name || "לא ידוע",
      quantity: item.quantity
    };
  });
}

export async function confirmOrder(customerData: { firstName: string, lastName: string, address: string, email: string }): Promise<OrderSummary> {
  const order = {
    customer: customerData,
    items: await getCart(),
    createdAt: new Date().toISOString()
  };

  const result = await client.index({
    index: "orders",
    body: order,
  });

  cart = [];

  return {
    orderId: result.body._id,
    ...order,
  };
}
