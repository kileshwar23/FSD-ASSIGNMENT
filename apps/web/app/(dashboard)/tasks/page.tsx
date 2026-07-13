'use client';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { api } from '@/services/api';
import type { Task } from '@/types';
export default function TasksPage() {
  const { data = [] } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: () =>
      api<{ assignedTasks: Task[] }>('/dashboard').then((dashboard) => dashboard.assignedTasks),
  });
  return (
    <div>
      <p className="text-sm font-medium text-primary">Your queue</p>
      <h1 className="mt-1 text-3xl font-semibold">My tasks</h1>
      <div className="mt-8 space-y-3">
        {data.map((task) => (
          <Card key={task._id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {task.status.replace('_', ' ')} · {task.priority}
              </p>
            </div>
            <span className="rounded bg-muted px-2 py-1 text-xs">{task.project?.key}</span>
          </Card>
        ))}
        {data.length === 0 && <p className="text-sm text-slate-500">Your task list is clear.</p>}
      </div>
    </div>
  );
}
