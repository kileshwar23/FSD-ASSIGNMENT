import { NotificationModel } from '../models/notification.js';
export const notify = (
  recipient: string,
  type: 'assignment' | 'comment' | 'project',
  message: string,
  resourceUrl?: string,
) => NotificationModel.create({ recipient, type, message, resourceUrl });
