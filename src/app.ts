import express from "express";
import cors from "cors";
import boardsRouter from "./routes/boards";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/boards", boardsRouter);

export default app;
