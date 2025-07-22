export interface OrderSummary {
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
  createdAt: string;
}
