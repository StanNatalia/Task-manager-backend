import { Request, Response } from "express";
import * as service from "../services/tasks.service";
import { ColumnType } from "../types/board.types";

const getParam = (param: string | string[]) =>
  Array.isArray(param) ? param[0] : param;

export const createTask = async (req: Request, res: Response) => {
  try {
    const boardId = getParam(req.params.boardId);
    const column = req.params.column as ColumnType;

    const task = await service.createTask(boardId, column, req.body);
    res.status(201).json(task);
  } catch (err: any) {
    console.error("Failed to create task:", err.message);
    res
      .status(500)
      .json({ message: "Failed to create task", error: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const boardId = getParam(req.params.boardId);
    const column = req.params.column as ColumnType;
    const taskId = getParam(req.params.taskId);

    const task = await service.updateTask(boardId, column, taskId, req.body);
    res.json(task);
  } catch (err: any) {
    console.error("Failed to update task:", err.message);
    res
      .status(500)
      .json({ message: "Failed to update task", error: err.message });
  }
};

export const moveTask = async (req: Request, res: Response) => {
  try {
    const boardId = getParam(req.params.boardId);
    const taskId = getParam(req.params.taskId);
    const { column: newColumn } = req.body as { column: ColumnType };

    const result = await service.moveTask(boardId, taskId, newColumn);
    res.json(result);
  } catch (err: any) {
    console.error("Failed to move task:", err.message);
    res
      .status(500)
      .json({ message: "Failed to move task", error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const boardId = getParam(req.params.boardId);
    const column = req.params.column as ColumnType;
    const taskId = getParam(req.params.taskId);

    await service.deleteTask(boardId, column, taskId);
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    console.error("Failed to delete task:", err.message);
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
};
