import { getDB } from "./infra/lowDb.js";
import { GetProductService } from "./services/GetProductService.js";
import { LowDbGetProductRepository } from "./infra/repositories/LowDbGetProductRepository.js";
import { LowDbMutateProductRepository } from "./infra/repositories/LowDbMutateProductRepository.js";
import { CommandFactory } from "./commands/CommandFactory.js";
import { LowDbMutateOrderRepository } from "./infra/repositories/LowDbMutateOrderRepository.js";
import { GetOrderService } from "./services/GetOrderService.js";
import { LowDbGetOrderRepository } from "./infra/repositories/LowDbGetOrderRepository.js";

const db = await getDB();

export const container = {
  productService: new GetProductService(new LowDbGetProductRepository(db)),
  orderService: new GetOrderService(new LowDbGetOrderRepository(db)),
  commandFactory: new CommandFactory(
    new LowDbMutateProductRepository(db),
    new LowDbMutateOrderRepository(db),
  ),
};
