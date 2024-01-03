import * as Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().max(250).required(),
  address: Joi.string().max(250).required(),
  gender: Joi.string().required(),
  username: Joi.string().min(4).max(250).required(),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

export const loginUserSchema = Joi.object({
  username: Joi.string().min(4).max(250).required(),
  password: Joi.string().min(8).max(20).required(),
});
