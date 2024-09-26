import { GetProductRepository } from "./interfaces/GetProductRepository.js";
import { Data } from "../lowDb.js";
import { Product } from "./interfaces/Product.js";
import { Low } from "lowdb";

export class LowDbGetProductRepository implements GetProductRepository {
  constructor(protected readonly db: Low<Data>) {}
  async getProducts(): Promise<Product[]> {
    await this.db.read();
    return this.db.data.products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    await this.db.read();
    return this.db.data.products.find((product) => product.id === id);
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    await this.db.read();
    return this.db.data.products.filter((product) => ids.includes(product.id));
  }
}
