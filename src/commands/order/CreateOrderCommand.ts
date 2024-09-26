import { MutateProductRepository } from "../../infra/repositories/interfaces/MutateProductRepository.js";
import { Product } from "../../infra/repositories/interfaces/Product.js";
import { Command } from "../Command.js";
import { MutateOrderRepository } from "../../infra/repositories/interfaces/MutateOrderRepository.js";

type CreateOrderDto = {
  customerId: string;
  products: string[];
};

export class CreateOrderCommand implements Command {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly orderRepository: MutateOrderRepository,
    private readonly commandData: CreateOrderDto,
  ) {}
  public async execute() {
    const { products: ids } = this.commandData;
    const products = await this.productRepository.getProductsByIds(ids);

    if (!this.allProductsAvailable(products, ids)) {
      return { success: false, reason: "One of the products is unavailable" };
    }

    if (!this.allProductsInStock(products)) {
      return { success: false, reason: "One of the products is out of stock" };
    }

    products.forEach((product) => {
      product.stock--;
    });

    await this.productRepository.updateProductsTransactional(products);

    const result = await this.orderRepository.createOrder(this.commandData);

    return { success: true, data: result };
  }

  private allProductsInStock(products: Product[]) {
    return products.map((product) => product.stock).every((stock) => stock > 0);
  }

  private allProductsAvailable(products: Product[], orderedProducts: string[]) {
    const sameLength = products.length === orderedProducts.length;
    const allOrderedProductsAvailable = products
      .map((product) => product.id)
      .every((id) => orderedProducts.includes(id));

    return sameLength && allOrderedProductsAvailable;
  }
}
