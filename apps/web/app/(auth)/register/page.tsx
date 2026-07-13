import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
export default function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Create your workspace</h1>
      <p className="mb-6 mt-2 text-sm text-slate-500">
        Start organising your team&apos;s best work.
      </p>
      <AuthForm mode="register" />
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link className="text-primary" href="/login">
          Sign in
        </Link>
      </p>
    </>
  );
}
