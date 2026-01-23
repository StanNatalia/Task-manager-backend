"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateId_1 = require("../utils/generateId");
const models_1 = __importDefault(require("../models/models"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { name } = req.body;
    const board = await models_1.default.create({
        boardId: (0, generateId_1.generateId)(),
        name,
        columns: { todo: [], inProgress: [], done: [] },
    });
    res.status(201).json(board);
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