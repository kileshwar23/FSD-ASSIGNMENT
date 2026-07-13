import { ActivityLogModel } from '../models/activity-log.js';
export const recordActivity = (
  actor: string,
  action: string,
  options: { project?: string; task?: string; metadata?: Record<string, unknown> } = {},
) => ActivityLogModel.create({ actor, action, ...options });
