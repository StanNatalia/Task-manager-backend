import { generateId } from "utils/generateId";
import * as repo from "../repositories/boards.repository";
import { ColumnType, Task } from "../types/board.types";

const columns: ColumnType[] = ["todo", "inProgress", "done"];

export const createTask = async (
  boardId: string,
  column: ColumnType,
  data: Pick<Task, "title" | "description">,
) => {
  if (!columns.includes(column)) throw new Error("Invalid column");
  const board = await repo.findById(boardId);
  if (!board) throw new Error("Board not found");

  const task: Task = { id: generateId(), ...data };
  board.columns[column].push(task);
  await repo.save(board);
  return task;
};

export const updateTask = async (
  boardId: string,
  column: ColumnType,
  taskId: string,
  data: Partial<Task>,
) => {
  const board = await repo.findById(boardId);
  if (!board) throw new Error("Board not found");

  const task = board.columns[column].find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found");

  Object.assign(task, data);
  await repo.save(board);
  return task;
};

export const moveTask = async (
  boardId: string,
  taskId: string,
  newColumn: ColumnType,
) => {
  const board = await repo.findById(boardId);
  if (!board) throw new Error("Board not found");

  let task: Task | undefined;
  let oldColumn: ColumnType | undefined;

  for (const col of columns) {
    const index = board.columns[col].findIndex((t) => t.id === taskId);
    if (index !== -1) {
      task = board.columns[col][index];
      oldColumn = col;
      board.columns[col].splice(index, 1);
      break;
    }
  }

  if (!task) throw new Error("Task not found");

  board.columns[newColumn].push(task);
  await repo.save(board);
  return { task, from: oldColumn, to: newColumn };
};

export const deleteTask = async (
  boardId: string,
  column: ColumnType,
  taskId: string,
) => {
  const board = await repo.findById(boardId);
  if (!board) throw new Error("Board not found");

  board.columns[column] = board.columns[column].filter((t) => t.id !== taskId);
  await repo.save(board);
};
