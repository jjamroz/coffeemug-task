import { CreateProductDto, Product, UpdateProductDto } from "./Product.js";
import { GetProductRepository } from "./GetProductRepository.js";

export interface MutateProductRepository extends GetProductRepository {
  createProduct(dto: CreateProductDto): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(dto: UpdateProductDto): Promise<Product>;
  updateProductsTransactional(dtos: UpdateProductDto[]): Promise<void>;
}
