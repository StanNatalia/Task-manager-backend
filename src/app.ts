import express from "express";
import cors from "cors";
import boardsRouter from "./routes/boards";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, "Incoming request");
  next();
});

app.use("/api/boards", boardsRouter);

export default app;
