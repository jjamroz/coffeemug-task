import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger.js";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(JSON.stringify({ error: err.message, stack: err.stack }));
  res.status(500).send("Internal Server error");
};
