import type { Request, Response } from 'express';
import { NotificationModel } from '../models/notification.js';
import { respond } from '../utils/api.js';
export const listNotifications = async (req: Request, res: Response) =>
  respond(
    res,
    200,
    'Notifications retrieved',
    await NotificationModel.find({ recipient: req.user!.id }).sort({ createdAt: -1 }).limit(30),
  );
export const readNotification = async (req: Request, res: Response) => {
  const notification = await NotificationModel.findOneAndUpdate(
    { _id: req.params.notificationId, recipient: req.user!.id },
    { readAt: new Date() },
    { new: true },
  );
  return notification
    ? respond(res, 200, 'Notification marked as read', notification)
    : respond(res, 404, 'Notification not found');
};
