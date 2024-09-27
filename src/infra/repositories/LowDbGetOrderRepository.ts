import { Data } from "../lowDb.js";
import { Low } from "lowdb";
import { GetOrderRepository } from "./interfaces/GetOrderRepository.js";
import { Order } from "./interfaces/Order.js";

export class LowDbGetOrderRepository implements GetOrderRepository {
  constructor(protected readonly db: Low<Data>) {}
  async getOrder(id: string): Promise<Order | undefined> {
    await this.db.read();
    return this.db.data.orders.find((product) => product.id === id);
  }
}
