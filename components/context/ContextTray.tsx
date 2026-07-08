import { Lock, RadioTower, ShieldCheck } from "lucide-react";
import type { ContextPacket } from "@/lib/context/types";
import { ContextChip } from "./ContextChip";
import { TokenBudgetMeter } from "./TokenBudgetMeter";

export function ContextTray({
  packet,
  maxTokens,
  onInspect
}: {
  packet: ContextPacket;
  maxTokens: number;
  onInspect: () => void;
}) {
  return (
    <section className="surface flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
          <ShieldCheck size={14} className="text-[var(--moss)]" />
          <span className="mono">{packet.id}</span>
          <span className="hidden sm:inline">context packet</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {packet.included.slice(0, 5).map((item, index) => (
            <ContextChip key={item.source.id} label={item.source.range ?? item.source.title} kind={item.source.kind} delay={index * 0.04} />
          ))}
          {packet.memories.slice(0, 2).map((memory) => (
            <ContextChip key={memory.id} label={memory.type.replace("_", " ")} kind="memory" delay={0.16} />
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center lg:w-[520px]">
        <TokenBudgetMeter used={packet.tokenEstimate} max={maxTokens} />
        <span className="mono inline-flex h-9 items-center gap-2 rounded-full border hairline px-3 text-[11px] text-[var(--paper-muted)]">
          {packet.dataLeavesDevice ? <RadioTower size={13} className="text-[var(--warning)]" /> : <Lock size={13} className="text-[var(--moss)]" />}
          {packet.dataLeavesDevice ? "approval before send" : "stays local"}
        </span>
        <button
          type="button"
          onClick={onInspect}
          className="focus-ring h-9 rounded-[6px] border hairline px-3 text-sm text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
        >
          Inspect
        </button>
      </div>
    </section>
  );
}
