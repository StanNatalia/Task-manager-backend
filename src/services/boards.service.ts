import { generateId } from "../utils/generateId";
import * as repo from "../repositories/boards.repository";
import { ColumnType, Task } from "../types/board.types";

const columns: ColumnType[] = ["todo", "inProgress", "done"];

export const getBoards = () => repo.findAll();

export const createBoard = async (name: string) => {
  if (!name?.trim()) throw new Error("Board name required");

  const exists = await repo.findByName(name);
  if (exists) throw new Error("Board already exists");

  return repo.create({
    boardId: generateId(),
    name,
    columns: { todo: [], inProgress: [], done: [] },
  });
};

export const getBoard = async (boardId: string) => {
  const board = await repo.findById(boardId);
  if (!board) throw new Error("Board not found");
  return board;
};

export const updateBoard = async (boardId: string, name: string) => {
  const board = await repo.update(boardId, { name });
  if (!board) throw new Error("Board not found");
  return board;
};

export const deleteBoard = (boardId: string) => repo.remove(boardId);

export const createTask = async (
  boardId: string,
  column: ColumnType,
  data: Pick<Task, "title" | "description">,
) => {
  if (!columns.includes(column)) throw new Error("Invalid column");

  const board = await getBoard(boardId);
  const task: Task = { id: generateId(), ...data };

  board.columns[column].push(task);
  await repo.save(board);

  return task;
};
