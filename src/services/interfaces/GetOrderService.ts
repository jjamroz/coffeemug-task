import { Order } from "../../infra/repositories/interfaces/Order.js";

export interface GetOrderService {
  getOrder(id: string): Promise<Order | undefined>;
}
