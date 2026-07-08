import { CheckCircle2, CircleDashed, ShieldAlert } from "lucide-react";

export function AgentTraceTimeline({ warnings }: { warnings: string[] }) {
  const items = [
    { label: "Read active surface", detail: "Surface and active item boosted", icon: CheckCircle2 },
    { label: "Rank local sources", detail: "Space, tags, entities, recency, trust", icon: CheckCircle2 },
    { label: "Apply permissions", detail: warnings[0] ?? "No permission warnings", icon: warnings.length ? ShieldAlert : CheckCircle2 },
    { label: "Compile packet", detail: "Only included citations are exposed", icon: CircleDashed }
  ];

  return (
    <ol className="space-y-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.label} className="grid grid-cols-[20px_1fr] gap-3">
            <Icon size={16} className={item.icon === ShieldAlert ? "mt-0.5 text-[var(--warning)]" : "mt-0.5 text-[var(--moss)]"} />
            <div>
              <p className="text-sm text-[var(--text)]">{item.label}</p>
              <p className="text-xs text-[var(--muted)]">{item.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
