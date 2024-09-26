import { v4 } from "uuid";
import { LowDbGetOrderRepository } from "./LowDbGetOrderRepository.js";
import { MutateOrderRepository } from "./interfaces/MutateOrderRepository.js";
import { CreateOrderDto, Order } from "./interfaces/Order.js";

export class LowDbMutateOrderRepository
  extends LowDbGetOrderRepository
  implements MutateOrderRepository
{
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    await this.db.read();
    const orderTable = this.db.data.orders;
    const newOrder = { ...dto, id: v4() };
    orderTable.push(newOrder);
    await this.db.write();
    return newOrder;
  }
}
