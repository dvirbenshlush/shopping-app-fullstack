import { Category } from "../../models/category.model";
import { OrderSummary } from "../../models/order.model";
import { Client } from "@opensearch-project/opensearch";

const client = new Client({
  node: process.env.OPENSEARCH_NODE || "http://localhost:9200"
});

let cart: { productId: string; quantity: number }[] = [];

export async function confirmOrder(customerData: { firstName: string, lastName: string, address: string, email: string}, items: Category[]): Promise<OrderSummary> {
  const order: OrderSummary = {
    customer: customerData,
    items: items,
    createdAt: new Date().toISOString(),
    orderId: ""
  };

  const result = await client.index({
    index: "orders",
    body: order,
  });

  order.orderId = result.body._id;
  cart = [];

  return {
    ...order,
  };
}
