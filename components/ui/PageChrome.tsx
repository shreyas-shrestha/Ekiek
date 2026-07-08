import Link from "next/link";
import { Database } from "lucide-react";

const nav = [
  { href: "/setup", label: "Setup" },
  { href: "/integrations", label: "Integrations" },
  { href: "/architecture", label: "Architecture" }
];

export function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b hairline bg-[rgba(247,244,238,0.84)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-[6px]">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] border hairline bg-[var(--panel)]">
              <Database size={16} className="text-[var(--moss)]" />
            </span>
            <span className="text-sm font-semibold">Ekiek</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-[8px] px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-black/[0.04] hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/app"
            className="focus-ring inline-flex items-center rounded-[10px] bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--canvas)] transition hover:bg-black active:translate-y-px"
          >
            Open workspace
          </Link>
        </div>
      </header>
      {children}
    </main>
  );
}
