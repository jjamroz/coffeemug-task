import { MutateProductRepository } from "../../infra/repositories/interfaces/MutateProductRepository.js";
import { Command } from "../Command.js";

type DeleteProductDto = {
  id: string;
};

export class DeleteProductCommand implements Command {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly commandData: DeleteProductDto,
  ) {}

  public async execute() {
    const { id } = this.commandData;
    const product = await this.productRepository.getProduct(id);

    if (!product) {
      return { success: false, reason: "Product unavailable" };
    }

    await this.productRepository.deleteProduct(id);
    return { success: true };
  }
}
