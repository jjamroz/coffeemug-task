import { Product } from "../../infra/repositories/interfaces/Product.js";

export interface GetProductService {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
}
