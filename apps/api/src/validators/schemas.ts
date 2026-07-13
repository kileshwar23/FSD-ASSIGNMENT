import { z } from 'zod';
export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
export const loginSchema = registerSchema.pick({ email: true, password: true });
export const projectSchema = z.object({
  name: z.string().min(2).max(120),
  key: z.string().regex(/^[A-Za-z][A-Za-z0-9]{1,9}$/),
  description: z.string().max(2000).optional(),
  members: z.array(z.string()).optional(),
});
export const taskSchema = z.object({
  title: z.string().min(1).max(180),
  description: z.string().max(10000).optional(),
  status: z.enum(['backlog', 'todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assignee: z.string().nullable().optional(),
  labels: z.array(z.string().min(1).max(30)).max(10).optional(),
  dueDate: z.coerce.date().nullable().optional(),
});
export const commentSchema = z.object({ body: z.string().min(1).max(5000) });
