export function TokenBudgetMeter({ used, max }: { used: number; max: number }) {
  const pct = Math.min(100, Math.round((used / Math.max(max, 1)) * 100));
  const color = pct > 85 ? "var(--warning)" : "var(--moss)";

  return (
    <div className="w-full min-w-[160px]">
      <div className="mb-1 flex items-center justify-between mono text-[10px] text-[var(--muted)]">
        <span>Token budget</span>
        <span>
          {used} / {max}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
