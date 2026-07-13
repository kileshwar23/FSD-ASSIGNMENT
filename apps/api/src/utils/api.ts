import type { Response } from 'express';
export const respond = <T>(res: Response, status: number, message: string, data?: T) =>
  res.status(status).json({ success: status < 400, message, data });
