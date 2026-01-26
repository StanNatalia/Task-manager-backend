"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateId_1 = require("../utils/generateId");
const models_1 = __importDefault(require("../models/models"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const boards = await models_1.default.find({}, { boardId: 1, name: 1, _id: 0 });
    res.json(boards);
});
router.post("/", async (req, res) => {
    const { name } = req.body;
    const existingBoard = await models_1.default.findOne({ name });
    if (existingBoard) {
        return res
            .status(400)
            .json({ message: "Board with this name already exists" });
    }
    const board = await models_1.default.create({
        boardId: (0, generateId_1.generateId)(),
        name,
        columns: { todo: [], inProgress: [], done: [] },
    });
    res.status(201).json(board);
});
router.put("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ message: "Board name is required" });
    }
    const existingBoard = await models_1.default.findOne({ name });
    if (existingBoard && existingBoard.boardId !== boardId) {
        return res
            .status(400)
            .json({ message: "Board with this name already exists" });
    }
    const board = await models_1.default.findOneAndUpdate({ boardId }, { name }, { new: true });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    res.json(board);
});
router.get("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const board = await models_1.default.findOne({ boardId });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    res.json(board);
});
router.delete("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    await models_1.default.findOneAndDelete({ boardId });
    res.json({ message: "Board deleted" });
});
router.post("/:boardId/:column", async (req, res) => {
    const { boardId, column } = req.params;
    const { title, description } = req.body;
    if (!["todo", "inProgress", "done"].includes(column)) {
        return res.status(400).json({ message: "Invalid column" });
    }
    const board = await models_1.default.findOne({ boardId });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
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
    const task = { id: (0, generateId_1.generateId)(), title, description };
    board.columns[column].push(task);
    await board.save();
    res.json(task);
});
router.put("/:boardId/:column/:taskId", async (req, res) => {
    const { boardId, column, taskId } = req.params;
    const { title, description } = req.body;
    const board = await models_1.default.findOne({ boardId });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    const tasks = board.columns[column];
    const task = tasks.find((t) => t.id === taskId);
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    task.title = title;
    task.description = description;
    await board.save();
    res.json(task);
});
router.patch("/:boardId/tasks/:taskId/column", async (req, res) => {
    const { boardId, taskId } = req.params;
    const { column: newColumn } = req.body;
    if (!["todo", "inProgress", "done"].includes(newColumn)) {
        return res.status(400).json({ message: "Invalid column" });
    }
    const board = await models_1.default.findOne({ boardId });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    let task;
    let oldColumn;
    for (const col of ["todo", "inProgress", "done"]) {
        const index = board.columns[col].findIndex((t) => t.id === taskId);
        if (index !== -1) {
            task = board.columns[col][index];
            oldColumn = col;
            board.columns[col].splice(index, 1);
            break;
        }
    }
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    board.columns[newColumn].push(task);
    await board.save();
    res.json({ task, from: oldColumn, to: newColumn });
});
router.delete("/:boardId/:column/:taskId", async (req, res) => {
    const { boardId, column, taskId } = req.params;
    const board = await models_1.default.findOne({ boardId });
    if (!board)
        return res.status(404).json({ message: "Board not found" });
    board.columns[column] = board.columns[column].filter((t) => t.id !== taskId);
    await board.save();
    res.json({ message: "Task deleted" });
});
exports.default = router;
//# sourceMappingURL=boards.js.map