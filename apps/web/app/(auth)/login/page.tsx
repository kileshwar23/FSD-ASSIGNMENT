import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mb-6 mt-2 text-sm text-slate-500">Sign in to continue shipping great work.</p>
      <AuthForm mode="login" />
      <p className="mt-6 text-center text-sm text-slate-500">
        New to BugForge?{' '}
        <Link className="text-primary" href="/register">
          Create an account
        </Link>
      </p>
    </>
  );
}
