import { Order } from "./Order.js";

export interface GetOrderRepository {
  getOrder(id: string): Promise<Order | undefined>;
}
