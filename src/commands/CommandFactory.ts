import { CommandType } from "./Command.js";
import { CreateOrderCommand } from "./order/CreateOrderCommand.js";
import { CreateProductCommand } from "./product/CreateProductCommand.js";
import { DeleteProductCommand } from "./product/DeleteProductCommand.js";
import { SellProductCommand } from "./stock/SellProductCommand.js";
import { RestockProductCommand } from "./stock/RestockProductCommand.js";
import { MutateProductRepository } from "../infra/repositories/interfaces/MutateProductRepository.js";
import { MutateOrderRepository } from "../infra/repositories/interfaces/MutateOrderRepository.js";

type createCommandDto = {
  type: CommandType;
  data: any;
};

export class CommandFactory {
  constructor(
    private readonly productRepository: MutateProductRepository,
    private readonly orderRepository: MutateOrderRepository,
  ) {}

  createCommand = ({ type, data }: createCommandDto) => {
    switch (type) {
      case CommandType.CreateOrder:
        return new CreateOrderCommand(
          this.productRepository,
          this.orderRepository,
          data,
        );
      case CommandType.CreateProduct:
        return new CreateProductCommand(this.productRepository, data);
      case CommandType.DeleteProduct:
        return new DeleteProductCommand(this.productRepository, data);
      case CommandType.SellProduct:
        return new SellProductCommand(this.productRepository, data);
      case CommandType.RestockProduct:
        return new RestockProductCommand(this.productRepository, data);
      default:
        const _exhaustiveCheck: never = type;
        throw new Error("Command not found!");
    }
  };
}
