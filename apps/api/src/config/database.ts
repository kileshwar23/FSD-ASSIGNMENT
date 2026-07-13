import mongoose from 'mongoose';
import { env } from './env.js';
export const connectDatabase = () => mongoose.connect(env.MONGO_URI);
