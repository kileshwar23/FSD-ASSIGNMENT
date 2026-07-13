export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatarUrl?: string;
}
export interface Project {
  _id: string;
  name: string;
  key: string;
  description: string;
  updatedAt: string;
}
export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  project?: Project;
  assignee?: User;
}
