import { CreateOrderDto, Order } from "./Order.js";
import { GetOrderRepository } from "./GetOrderRepository.js";

export interface MutateOrderRepository extends GetOrderRepository {
  createOrder(dto: CreateOrderDto): Promise<Order>;
}
