export interface Order {
  id: string;
  customerId: string;
  products: string[];
}

export type CreateOrderDto = Omit<Order, "id">;
