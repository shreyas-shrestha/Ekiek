"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyableSnippet({ code, label = "Copy" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between border-b hairline px-3 py-2">
        <span className="mono text-[11px] text-[var(--muted)]">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="focus-ring inline-flex h-8 items-center gap-2 rounded-[6px] border hairline px-2 text-xs text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
          aria-label="Copy snippet"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scrollbar-soft max-h-[360px] overflow-auto p-4 text-xs leading-relaxed text-[var(--paper-muted)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
