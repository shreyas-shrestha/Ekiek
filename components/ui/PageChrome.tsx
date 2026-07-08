import Link from "next/link";
import { Database, ShieldCheck } from "lucide-react";

const nav = [
  { href: "/app", label: "Workspace" },
  { href: "/setup", label: "Setup" },
  { href: "/integrations", label: "Integrations" },
  { href: "/architecture", label: "Architecture" }
];

export function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b hairline bg-[rgba(9,11,13,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-[6px]">
            <span className="grid h-8 w-8 place-items-center rounded-[7px] border hairline bg-[var(--panel-2)]">
              <Database size={16} className="text-[var(--moss)]" />
            </span>
            <span className="text-sm font-semibold tracking-[0.08em]">Ekiek</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-[6px] px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/app"
            className="focus-ring inline-flex items-center gap-2 rounded-[7px] bg-[var(--paper)] px-3 py-2 text-sm font-medium text-[#15130f] transition hover:bg-white active:translate-y-px"
          >
            <ShieldCheck size={15} />
            Open
          </Link>
        </div>
      </header>
      {children}
    </main>
  );
}
