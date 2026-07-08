import type { ContextSource } from "@/lib/context/types";

export function SourceCitation({ source }: { source: ContextSource }) {
  const citation = source.citations[0];

  return (
    <span className="mono inline-flex max-w-full items-center gap-2 rounded-full border hairline bg-white/[0.035] px-2 py-1 text-[11px] text-[var(--paper-muted)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--moss)]" />
      <span className="truncate">{citation?.label ?? source.title}</span>
      <span className="hidden text-[var(--muted)] sm:inline">{citation?.locator}</span>
    </span>
  );
}
