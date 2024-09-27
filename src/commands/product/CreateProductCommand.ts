import { MutateProductRepository } from "../../infra/repositories/interfaces/MutateProductRepository.js";
import { CreateProductDto } from "../../infra/repositories/interfaces/Product.js";
import { Command } from "../Command.js";

export class CreateProductCommand implements Command {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly commandData: CreateProductDto,
  ) {}

  public async execute() {
    if (!(this.commandData.price > 0)) {
      return { success: false, reason: "Product price needs to be positive" };
    }
    const product = await this.productRepository.createProduct(
      this.commandData,
    );
    return { success: true, data: product };
  }
}
