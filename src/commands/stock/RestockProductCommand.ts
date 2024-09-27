import { GetProductRepository } from "../../infra/repositories/interfaces/GetProductRepository.js";
import { MutateProductRepository } from "../../infra/repositories/interfaces/MutateProductRepository.js";
import { CreateProductDto } from "../../infra/repositories/interfaces/Product.js";
import { Command } from "../Command.js";
type RestockProductDto = {
  id: string;
};
export class RestockProductCommand implements Command {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly commandData: RestockProductDto,
  ) {}

  public async execute() {
    const { id } = this.commandData;
    const product = await this.productRepository.getProduct(id);

    if (!product) {
      return { success: false, reason: "Product unavailable" };
    }

    product.stock++;
    await this.productRepository.updateProduct(product);
    return { success: true };
  }
}
