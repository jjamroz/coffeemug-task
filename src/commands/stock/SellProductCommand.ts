import { MutateProductRepository } from "../../infra/repositories/interfaces/MutateProductRepository.js";
import { Command } from "../Command.js";

type SellProductDto = {
  id: string;
};

export class SellProductCommand implements Command {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly commandData: SellProductDto,
  ) {}

  public async execute() {
    const { id } = this.commandData;
    const product = await this.productRepository.getProduct(id);

    if (!product) {
      return { success: false, reason: "Product unavailable" };
    }

    if (!(product.stock > 0)) {
      return { success: false, reason: "Product out of stock" };
    }

    product.stock--;
    await this.productRepository.updateProduct(product);
    return { success: true };
  }
}
