import mongoose, { Schema, Document, model } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate?: Date;
    completedAt?: Date;
    userId: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    tags: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date },
    completedAt: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Todo = mongoose.models.Todo || model<ITodo>("Todo", todoSchema);
export default Todo;