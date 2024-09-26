import { MutateProductRepository } from "./interfaces/MutateProductRepository.js";
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "./interfaces/Product.js";
import { LowDbGetProductRepository } from "./LowDbGetProductRepository.js";
import { v4 } from "uuid";
import { logger } from "../logger.js";

export class LowDbMutateProductRepository
  extends LowDbGetProductRepository
  implements MutateProductRepository
{
  async createProduct(dto: CreateProductDto): Promise<Product> {
    await this.db.read();
    const productTable = this.db.data.products;
    const newProduct = { ...dto, id: v4() };
    productTable.push(newProduct);
    await this.db.write();
    return newProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.db.read();
    const productTable = this.db.data.products;
    this.db.data.products = productTable.filter((product) => product.id !== id);
    return this.db.write();
  }

  async updateProduct(dto: UpdateProductDto): Promise<Product> {
    await this.db.read();
    const productTable = this.db.data.products;
    const index = productTable.findIndex((product) => product.id === dto.id);
    if (index !== -1) {
      productTable[index] = { ...productTable[index], ...dto };
    } else {
      productTable.push(dto);
    }

    await this.db.write();
    return dto;
  }

  async updateProductsTransactional(dtos: UpdateProductDto[]): Promise<void> {
    await this.db.read();
    const productTable = this.db.data.products;
    const updatedIds = dtos.map((dto) => dto.id);
    const notUpdatedProducts = productTable.filter(
      (product) => !updatedIds.includes(product.id),
    );
    this.db.data.products = [...notUpdatedProducts, ...dtos];
    return await this.db.write();
  }
}
