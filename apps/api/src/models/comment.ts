import { InferSchemaType, Schema, model } from 'mongoose';
const commentSchema = new Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);
export type Comment = InferSchemaType<typeof commentSchema>;
export const CommentModel = model('Comment', commentSchema);
