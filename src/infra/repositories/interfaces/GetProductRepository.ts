import { Product } from "./Product.js";

export interface GetProductRepository {
  getProduct(id: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getProductsByIds(ids: string[]): Promise<Product[]>;
}
