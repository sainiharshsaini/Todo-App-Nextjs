import mongoose, { Schema, Document, model } from "mongoose";

export interface ITag extends Document {
    name: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tag || model<ITag>("Tag", tagSchema);
