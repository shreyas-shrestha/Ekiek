"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellOff, Brain, CheckCircle2, CircleDotDashed, Lock, RadioTower, Send, X } from "lucide-react";
import { useMemo, useState } from "react";
import { answerForSurface, surfaceSuggestions } from "@/lib/context/answers";
import { actionDecisions } from "@/lib/context/permissions";
import type { ActiveSurface, ContextPacket, ContextRequest } from "@/lib/context/types";
import { ActionApprovalCard } from "@/components/context/ActionApprovalCard";
import { PermissionGate } from "@/components/context/PermissionGate";

const modes = ["Ask", "Act", "Remember", "Automate"] as const;

export function AgentSidecar({
  surface,
  packet,
  request,
  onCompile,
  onInspect,
  onOpenMemory
}: {
  surface: ActiveSurface;
  packet: ContextPacket;
  request: ContextRequest;
  onCompile: () => void;
  onInspect: () => void;
  onOpenMemory: () => void;
}) {
  const [mode, setMode] = useState<(typeof modes)[number]>("Ask");
  const [quiet, setQuiet] = useState(false);
  const [answer, setAnswer] = useState(answerForSurface(surface));
  const decisions = useMemo(() => actionDecisions({ dataLeavesDevice: packet.dataLeavesDevice }, request), [packet.dataLeavesDevice, request]);

  function ask() {
    setAnswer(answerForSurface(surface));
  }

  return (
    <aside className="surface flex min-h-[620px] flex-col overflow-hidden lg:min-h-0">
      <div className="border-b hairline p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[rgba(183,243,107,0.12)] text-[var(--moss)]">
              <CircleDotDashed size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold">Ekiek</p>
              <p className="mono text-[10px] text-[var(--muted)]">Shift Space · attached to {surface}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setQuiet((value) => !value)}
            className="focus-ring grid h-8 w-8 place-items-center rounded-[6px] border hairline text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
            aria-label="Toggle quiet mode"
          >
            {quiet ? <BellOff size={15} className="text-[var(--warning)]" /> : <Bell size={15} />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded-[7px] border hairline bg-black/20 p-1">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`focus-ring rounded-[5px] px-2 py-1.5 text-xs transition ${
                mode === item ? "bg-[var(--paper)] text-[#15130f]" : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollbar-soft flex-1 space-y-4 overflow-auto p-3">
        <div className="rounded-[8px] border hairline bg-black/15 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
            {packet.dataLeavesDevice ? <RadioTower size={14} className="text-[var(--warning)]" /> : <Lock size={14} className="text-[var(--moss)]" />}
            <span>{packet.dataLeavesDevice ? "External target selected" : "Data stayed local"}</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--paper-muted)]">
            {quiet
              ? "Quiet mode is on. I will only surface approvals, warnings, and explicit requests."
              : packet.summary}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === "Ask" ? (
            <motion.section key="ask" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3 className="mb-2 text-sm font-medium">Suggested asks</h3>
              <div className="grid gap-2">
                {surfaceSuggestions[surface].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={ask}
                    className="focus-ring rounded-[7px] border hairline px-3 py-2 text-left text-sm text-[var(--paper-muted)] transition hover:bg-white/5 hover:text-[var(--text)] active:translate-y-px"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="mt-3 rounded-[8px] border hairline bg-[rgba(183,243,107,0.07)] p-3">
                <p className="mb-2 text-xs font-medium text-[var(--moss)]">Deterministic answer</p>
                <p className="text-sm leading-relaxed text-[var(--paper-muted)]">{answer}</p>
              </div>
            </motion.section>
          ) : null}

          {mode === "Act" ? (
            <motion.section key="act" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              <h3 className="text-sm font-medium">Approval path</h3>
              <ActionApprovalCard title="Draft email to Alex" detail="Allowed as draft. Sending stays gated." />
              <ActionApprovalCard title="Attach packet to Cursor" detail="Previewed packet, no full workspace dump." />
              <div className="grid gap-2">
                {decisions.slice(0, 4).map((decision) => (
                  <PermissionGate key={decision.action} decision={decision} />
                ))}
              </div>
            </motion.section>
          ) : null}

          {mode === "Remember" ? (
            <motion.section key="remember" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              <h3 className="text-sm font-medium">Memory proposals</h3>
              <button
                type="button"
                onClick={onOpenMemory}
                className="focus-ring flex w-full items-center justify-between rounded-[8px] border hairline bg-white/[0.035] p-3 text-left transition hover:bg-white/[0.06]"
              >
                <span>
                  <span className="block text-sm text-[var(--text)]">Review memory inbox</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">Approve, edit, reject, or never remember.</span>
                </span>
                <Brain size={16} className="text-[var(--moss)]" />
              </button>
              {packet.memories.map((memory) => (
                <div key={memory.id} className="surface-2 p-3">
                  <p className="text-sm leading-relaxed text-[var(--paper-muted)]">{memory.content}</p>
                  <p className="mono mt-2 text-[10px] text-[var(--muted)]">{memory.type}</p>
                </div>
              ))}
            </motion.section>
          ) : null}

          {mode === "Automate" ? (
            <motion.section key="automate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              <h3 className="text-sm font-medium">Draft automations</h3>
              <div className="surface-2 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text)]">
                  <CheckCircle2 size={15} className="text-[var(--moss)]" />
                  Friday pricing deck reminder
                </div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">Proposed from Alex thread. Creates a local task only after approval.</p>
              </div>
              <div className="surface-2 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text)]">
                  <X size={15} className="text-[var(--danger)]" />
                  Production deploy
                </div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">Blocked in prototype. Sensitive actions require a separate approval broker.</p>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="border-t hairline p-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCompile}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-[7px] bg-[var(--paper)] px-3 py-2 text-sm font-medium text-[#15130f] transition hover:bg-white active:translate-y-px"
          >
            <Send size={15} />
            Compile Context
          </button>
          <button
            type="button"
            onClick={onInspect}
            className="focus-ring rounded-[7px] border hairline px-3 py-2 text-sm text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
          >
            Inspect
          </button>
        </div>
      </div>
    </aside>
  );
}
