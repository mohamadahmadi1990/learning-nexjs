import mongoose, { Schema, Document, model } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || model<ITodo>("Todo", TodoSchema);
export default Todo;


