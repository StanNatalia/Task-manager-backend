import { Request, Response } from "express";
import * as service from "../services/boards.service";

export const getBoards = async (_: Request, res: Response) => {
  try {
    const boards = await service.getBoards();
    res.json(boards);
  } catch (error) {
    console.error("Failed to get boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const board = await service.createBoard(req.body.name);
    res.status(201).json(board);
  } catch (error) {
    console.error("Failed to create board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    const boardId = Array.isArray(req.params.boardId)
      ? req.params.boardId[0]
      : req.params.boardId;

    const board = await service.getBoard(boardId);
    res.json(board);
  } catch (error) {
    console.error("Failed to get board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const boardId = Array.isArray(req.params.boardId)
      ? req.params.boardId[0]
      : req.params.boardId;
    const name = Array.isArray(req.body.name)
      ? req.body.name[0]
      : req.body.name;

    const updated = await service.updateBoard(boardId, name);
    res.json(updated);
  } catch (error) {
    console.error("Failed to update board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const boardId = Array.isArray(req.params.boardId)
      ? req.params.boardId[0]
      : req.params.boardId;

    await service.deleteBoard(boardId);
    res.json({ message: "Board deleted" });
  } catch (error) {
    console.error("Failed to delete board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
