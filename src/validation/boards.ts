import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});
