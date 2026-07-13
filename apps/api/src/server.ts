import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
const start = async () => {
  await connectDatabase();
  createApp().listen(env.API_PORT, () => console.log(`BugForge API listening on ${env.API_PORT}`));
};
void start();
