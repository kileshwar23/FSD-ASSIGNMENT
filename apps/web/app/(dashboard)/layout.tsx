'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { useAuth } from '@/contexts/auth-context';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.replace('/login');
  }, [ready, user, router]);
  if (!ready || !user)
    return (
      <div className="grid min-h-screen place-items-center text-sm text-slate-500">
        Loading workspace…
      </div>
    );
  return <AppShell>{children}</AppShell>;
}
