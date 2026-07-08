"use client";

import { Check, Edit3, EyeOff, X } from "lucide-react";
import { useState } from "react";
import type { Memory } from "@/lib/context/types";

export function MemoryCard({
  memory,
  onApprove,
  onReject
}: {
  memory: Memory;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(memory.content);

  return (
    <article className="surface-2 p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mono mb-1 text-[10px] text-[var(--moss)]">{memory.type.replaceAll("_", " ")}</p>
          {editing ? (
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="focus-ring min-h-20 w-full rounded-[6px] border hairline bg-black/20 p-2 text-sm text-[var(--text)]"
              aria-label="Edit memory content"
            />
          ) : (
            <p className="text-sm leading-relaxed text-[var(--paper-muted)]">{content}</p>
          )}
        </div>
        <span className="mono shrink-0 rounded-full border hairline px-2 py-1 text-[10px] text-[var(--muted)]">
          {Math.round(memory.confidence * 100)}%
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2 mono text-[10px] text-[var(--muted)]">
        <span className="chip px-2 py-1">{memory.scope}</span>
        <span className="chip px-2 py-1">{memory.sensitivity}</span>
        <span className="chip px-2 py-1">{memory.allowedUses.join(", ")}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onApprove(memory.id)}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] bg-[var(--moss)] px-3 text-xs font-medium text-[#11150b] transition active:translate-y-px"
        >
          <Check size={13} />
          Approve
        </button>
        <button
          type="button"
          onClick={() => setEditing((value) => !value)}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] border hairline px-3 text-xs text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
        >
          <Edit3 size={13} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onReject(memory.id)}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] border hairline px-3 text-xs text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
        >
          <X size={13} />
          Reject
        </button>
        <button
          type="button"
          onClick={() => onReject(memory.id)}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] border border-[rgba(255,107,107,0.32)] px-3 text-xs text-[var(--danger)] transition hover:bg-[rgba(255,107,107,0.08)] active:translate-y-px"
        >
          <EyeOff size={13} />
          Never
        </button>
      </div>
    </article>
  );
}
