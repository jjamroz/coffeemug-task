import "dotenv/config";
import express, { Express } from "express";
import helmet from "helmet";

import productsRouter from "./infra/api/routes/product.js";
import ordersRouter from "./infra/api/routes/order.js";
import { logger } from "./infra/logger.js";
import { errorHandlerMiddleware } from "./infra/api/middlewares/errorHandlerMiddleware.js";
import { morganMiddleware } from "./infra/api/middlewares/morganMiddleware.js";

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(morganMiddleware);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  logger.info(`[Server] running at http://localhost:${port}`);
});
