import { Category } from "./category.model";

export interface OrderSummary {
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  };
  items: Category[];
  createdAt: string;
}
