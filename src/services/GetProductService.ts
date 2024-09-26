import { GetProductRepository } from "../infra/repositories/interfaces/GetProductRepository.js";
import { GetProductService as GetProductServiceInterface } from "./interfaces/GetProductService.js";

export class GetProductService implements GetProductServiceInterface {
  constructor(private readonly productRepo: GetProductRepository) {}

  async getProducts() {
    return await this.productRepo.getProducts();
  }

  async getProduct(id: string) {
    return await this.productRepo.getProduct(id);
  }
}
