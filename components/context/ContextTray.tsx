import { Lock, RadioTower } from "lucide-react";
import type { ContextPacket } from "@/lib/context/types";

export function ContextPill({ packet, onInspect }: { packet: ContextPacket; onInspect: () => void }) {
  const primary = packet.included[0]?.source.range ?? `${packet.included.length} sources`;
  const memoryCount = Math.min(packet.memories.length, 1);

  return (
    <button
      type="button"
      onClick={onInspect}
      className="focus-ring inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.92)] px-4 py-2 text-sm text-[var(--ink)] shadow-[0_12px_34px_rgba(58,49,35,0.1)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white active:translate-y-px"
    >
      {packet.dataLeavesDevice ? <RadioTower size={14} className="text-[var(--amber)]" /> : <Lock size={14} className="text-[var(--moss)]" />}
      <span className="truncate">{primary}</span>
      <span className="text-[var(--faint)]">·</span>
      <span>{memoryCount} memor{memoryCount === 1 ? "y" : "ies"}</span>
      <span className="text-[var(--faint)]">·</span>
      <span>{packet.dataLeavesDevice ? "approval" : "local"}</span>
    </button>
  );
}

export function ContextTray({ packet, onInspect }: { packet: ContextPacket; maxTokens?: number; onInspect: () => void }) {
  return <ContextPill packet={packet} onInspect={onInspect} />;
}
