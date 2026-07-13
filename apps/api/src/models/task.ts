import { InferSchemaType, Schema, model } from 'mongoose';
const taskSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['backlog', 'todo', 'in_progress', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    assignee: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    labels: [{ type: String, trim: true }],
    dueDate: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);
taskSchema.index({ project: 1, status: 1, updatedAt: -1 });
export type Task = InferSchemaType<typeof taskSchema>;
export const TaskModel = model('Task', taskSchema);
