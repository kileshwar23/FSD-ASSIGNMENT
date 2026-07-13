import type { HydratedDocument } from 'mongoose';
import type { User } from '../models/user.js';
declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<User>;
    }
  }
}
export {};
