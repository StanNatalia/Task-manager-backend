import { Router, Request, Response } from "express";
import { generateId } from "../utils/generateId";
import Board from "../models/models";
import { BoardColumns, ColumnType, Task } from "types/board.types";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body as { name: string };

  const existingBoard = await Board.findOne({ name });
  if (existingBoard) {
    return res
      .status(400)
      .json({ message: "Board with this name already exists" });
  }

  const board = await Board.create({
    boardId: generateId(),
    name,
    columns: { todo: [], inProgress: [], done: [] },
  });

  res.status(201).json(board);
});

router.get("/:boardId", async (req: Request, res: Response) => {
  const { boardId } = req.params;

  const board = await Board.findOne({ boardId });
  if (!board) return res.status(404).json({ message: "Board not found" });

  res.json(board);
});

router.delete("/:boardId", async (req: Request, res: Response) => {
  const { boardId } = req.params;
  await Board.findOneAndDelete({ boardId });
  res.json({ message: "Board deleted" });
});

router.post("/:boardId/:column", async (req: Request, res: Response) => {
  const { boardId, column } = req.params as {
    boardId: string;
    column: ColumnType;
  };
  const { title, description } = req.body as {
    title: string;
    description: string;
  };

  if (!["todo", "inProgress", "done"].includes(column)) {
    return res.status(400).json({ message: "Invalid column" });
  }

  const board = await Board.findOne({ boardId });
  if (!board) return res.status(404).json({ message: "Board not found" });

  const allTasks = [
    ...board.columns.todo,
    ...board.columns.inProgress,
    ...board.columns.done,
  ];

  const duplicate = allTasks.find((t) => t.title === title);
  if (duplicate) {
    return res
      .status(400)
      .json({ message: "Task with this title already exists" });
  }

  const task: Task = { id: generateId(), title, description };
  board.columns[column].push(task);
  await board.save();
  res.json(task);
});

router.put("/:boardId/:column/:taskId", async (req: Request, res: Response) => {
  const { boardId, column, taskId } = req.params as {
    boardId: string;
    column: ColumnType;
    taskId: string;
  };
  const { title, description } = req.body as {
    title: string;
    description: string;
  };

  const board = await Board.findOne({ boardId });
  if (!board) return res.status(404).json({ message: "Board not found" });

  const tasks = board.columns[column];
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = title;
  task.description = description;

  await board.save();

  res.json(task);
});

router.delete(
  "/:boardId/:column/:taskId",
  async (req: Request, res: Response) => {
    const { boardId, column, taskId } = req.params as {
      boardId: string;
      column: ColumnType;
      taskId: string;
    };

    const board = await Board.findOne({ boardId });
    if (!board) return res.status(404).json({ message: "Board not found" });
    board.columns[column] = board.columns[column].filter(
      (t) => t.id !== taskId,
    );
    await board.save();
    res.json({ message: "Task deleted" });
  },
);

export default router;
