import Joi, { ValidationOptions } from "joi";
import { Request, Response, NextFunction } from "express";

const validationOptions: ValidationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};
export const validateSchema = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      res.status(422).json(error);
    } else {
      return next();
    }
  };
};
