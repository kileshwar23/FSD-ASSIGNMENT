import Link from 'next/link';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-muted p-5">
      <section className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <Link href="/" className="mb-8 flex items-center gap-2 text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
            B
          </span>
          BugForge
        </Link>
        {children}
      </section>
    </main>
  );
}
