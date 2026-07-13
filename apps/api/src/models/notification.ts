import { InferSchemaType, Schema, model } from 'mongoose';
const notificationSchema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['assignment', 'comment', 'project'], required: true },
    readAt: Date,
    resourceUrl: String,
  },
  { timestamps: true },
);
notificationSchema.index({ recipient: 1, readAt: 1, createdAt: -1 });
export type Notification = InferSchemaType<typeof notificationSchema>;
export const NotificationModel = model('Notification', notificationSchema);
