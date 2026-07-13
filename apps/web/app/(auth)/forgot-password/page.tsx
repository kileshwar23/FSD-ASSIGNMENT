'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await api('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
        setSent(true);
      }}
    >
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <p className="mb-6 mt-2 text-sm text-slate-500">
        Enter your email and we&apos;ll send mock reset instructions.
      </p>
      {sent ? (
        <p className="rounded-lg bg-muted p-4 text-sm">
          If an account exists, reset instructions have been sent.
        </p>
      ) : (
        <>
          <Input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button className="mt-4 w-full">Send reset instructions</Button>
        </>
      )}
    </form>
  );
}
