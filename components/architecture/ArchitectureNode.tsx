import type { LucideIcon } from "lucide-react";

export function ArchitectureNode({
  title,
  detail,
  icon: Icon,
  tone = "normal"
}: {
  title: string;
  detail: string;
  icon: LucideIcon;
  tone?: "normal" | "accent" | "warning";
}) {
  const color = tone === "accent" ? "text-[var(--moss)]" : tone === "warning" ? "text-[var(--warning)]" : "text-[var(--paper-muted)]";

  return (
    <div className="surface-2 min-h-[140px] p-4">
      <Icon size={18} className={color} />
      <h3 className="mt-8 text-sm font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{detail}</p>
    </div>
  );
}
