import mongoose, { Document, Schema } from "mongoose";

export interface ITask {
  id: string;
  title: string;
  description?: string;
}

export interface IBoard extends Document {
  boardId: string;
  name: string;
  columns: {
    todo: ITask[];
    inProgress: ITask[];
    done: ITask[];
  };
}

const TaskSchema: Schema = new Schema({
  id: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String },
});

const BoardSchema: Schema = new Schema({
  boardId: { type: String, required: true, unique: true },
  name: { type: String, require: true },
  columns: {
    todo: [TaskSchema],
    inProgress: [TaskSchema],
    done: [TaskSchema],
  },
});

export default mongoose.model<IBoard>("Board", BoardSchema),
