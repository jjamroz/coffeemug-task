import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  price: Joi.number().greater(0),
  stock: Joi.number().integer().min(0),
});

export const createOrderSchema = Joi.object({
  customerId: Joi.string().max(50).required(),
  products: Joi.array().unique().min(0).required().items(Joi.string().max(50)),
});
