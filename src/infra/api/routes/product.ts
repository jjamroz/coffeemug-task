import express, { Request, Response, NextFunction } from "express";
import { validateSchema } from "../validators/validateSchema.js";
import { createProductSchema } from "../validators/schema.js";
import { CommandType } from "../../../commands/Command.js";
import { container } from "../../../container.js";

const productsRouter = express.Router();

const commandFactory = container.commandFactory;
const productService = container.productService;

productsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.getProducts();
      res.send(result);
    } catch (e) {
      next(e);
    }
  },
);

productsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.getProduct(req.params.id);
      res.status(result ? 200 : 404).send(result);
    } catch (e) {
      next(e);
    }
  },
);

productsRouter.post(
  "/",
  validateSchema(createProductSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const command = commandFactory.createCommand({
        type: CommandType.CreateProduct,
        data: req.body,
      });
      const result = await command.execute();
      res.status(result.success ? 200 : 409).send(result);
    } catch (e) {
      next(e);
    }
  },
);

productsRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const command = commandFactory.createCommand({
        type: CommandType.DeleteProduct,
        data: { id: req.params.id },
      });
      const result = await command.execute();
      res.status(result.success ? 200 : 409).send(result);
    } catch (e) {
      next(e);
    }
  },
);

productsRouter.post(
  "/:id/restock",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const command = commandFactory.createCommand({
        type: CommandType.RestockProduct,
        data: { id: req.params.id },
      });
      const result = await command.execute();
      res.status(result.success ? 200 : 409).send(result);
    } catch (e) {
      next(e);
    }
  },
);

productsRouter.post(
  "/:id/sell",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const command = commandFactory.createCommand({
        type: CommandType.SellProduct,
        data: { id: req.params.id },
      });
      const result = await command.execute();
      res.status(result.success ? 200 : 409).send(result);
    } catch (e) {
      next(e);
    }
  },
);

export default productsRouter;
