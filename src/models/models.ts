import mongoose, { Document, Schema } from "mongoose";
import { BoardColumns, Task } from "types/board.types";

export interface ITask {
  id: string;
  title: string;
  description?: string;
}

export interface IBoard extends Document {
  boardId: string;
  name: string;
  columns: BoardColumns;
}

const TaskSchema = new Schema<Task>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
});

const BoardSchema = new Schema<IBoard>({
  boardId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  columns: {
    todo: [TaskSchema],
    inProgress: [TaskSchema],
    done: [TaskSchema],
  },
});

export default mongoose.model<IBoard>("Board", BoardSchema);
