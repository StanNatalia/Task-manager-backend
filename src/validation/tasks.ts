import Joi from "joi";
import { ColumnType } from "../types/board.types";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().allow("", null),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  description: Joi.string().allow("", null),
});

export const moveTaskSchema = Joi.object({
  column: Joi.string()
    .valid("todo", "inProgress", "done")
    .required() as unknown as ColumnType,
});
