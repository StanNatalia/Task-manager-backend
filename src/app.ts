import express from "express";
import cors from "cors";
import boardsRouter from "./routes/boards.routes";
import tasksRouter from "./routes/tasks.routes";
import logger from "./utils/logger";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, "Incoming request");
  next();
});

mongoose.set("autoIndex", false);

app.use("/api/boards", boardsRouter);
app.use("/api/boards/:boardId/tasks", tasksRouter);

export default app;
