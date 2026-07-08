import { Cpu, RadioTower } from "lucide-react";
import type { ModelTarget } from "@/lib/context/types";

const targets: Array<{ id: ModelTarget; label: string }> = [
  { id: "local", label: "Local" },
  { id: "claude", label: "Claude" },
  { id: "cursor", label: "Cursor" },
  { id: "cloud", label: "Cloud" }
];

export function ModelRouterPanel({ value, onChange }: { value: ModelTarget; onChange: (value: ModelTarget) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
        {value === "local" ? <Cpu size={14} className="text-[var(--moss)]" /> : <RadioTower size={14} className="text-[var(--warning)]" />}
        <span>Model target</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {targets.map((target) => (
          <button
            key={target.id}
            type="button"
            onClick={() => onChange(target.id)}
            className={`focus-ring rounded-[6px] px-2 py-1.5 text-xs transition ${
              value === target.id ? "bg-[var(--paper)] text-[#15130f]" : "border hairline text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
            }`}
          >
            {target.label}
          </button>
        ))}
      </div>
    </div>
  );
}
