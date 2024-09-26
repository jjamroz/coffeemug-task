import express, { NextFunction, Request, Response } from "express";
import { validateSchema } from "../validators/validateSchema.js";
import { createOrderSchema } from "../validators/schema.js";
import { CommandType } from "../../../commands/Command.js";
import { container } from "../../../container.js";

const ordersRouter = express.Router();
const commandFactory = container.commandFactory;
const orderService = container.orderService;

ordersRouter.post(
  "/",
  validateSchema(createOrderSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const command = commandFactory.createCommand({
        type: CommandType.CreateOrder,
        data: req.body,
      });
      const result = await command.execute();
      res.status(result.success ? 200 : 409).send(result);
    } catch (e) {
      next(e);
    }
  },
);

ordersRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.getOrder(req.params.id);
      res.status(result ? 200 : 404).send(result);
    } catch (e) {
      next(e);
    }
  },
);

export default ordersRouter;
