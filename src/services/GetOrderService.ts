import { GetOrderService as GetOrderServiceInterface } from "./interfaces/GetOrderService.js";
import { GetOrderRepository } from "../infra/repositories/interfaces/GetOrderRepository.js";

export class GetOrderService implements GetOrderServiceInterface {
  constructor(private readonly orderRepo: GetOrderRepository) {}

  async getOrder(id: string) {
    return await this.orderRepo.getOrder(id);
  }
}
