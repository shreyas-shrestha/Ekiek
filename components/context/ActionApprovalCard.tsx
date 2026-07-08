"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function ActionApprovalCard({ title, detail }: { title: string; detail: string }) {
  const [state, setState] = useState<"idle" | "approved" | "blocked">("idle");

  return (
    <div className="surface-2 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--text)]">{title}</p>
          <p className="text-xs text-[var(--muted)]">{detail}</p>
        </div>
        <span className="mono rounded-full border hairline px-2 py-1 text-[10px] text-[var(--warning)]">
          {state === "idle" ? "approval" : state}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setState("approved")}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] bg-[var(--moss)] px-3 text-xs font-medium text-[#11150b] transition active:translate-y-px"
        >
          <Check size={13} />
          Approve
        </button>
        <button
          type="button"
          onClick={() => setState("blocked")}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] border hairline px-3 text-xs text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
        >
          <X size={13} />
          Block
        </button>
      </div>
    </div>
  );
}
