"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Lock, MoreHorizontal, Plug, Send, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import { answerForSurface, surfaceSuggestions } from "@/lib/context/answers";
import type { ActiveSurface, ContextPacket, ContextRequest } from "@/lib/context/types";

export function AgentPill({
  surface,
  packet,
  onOpen
}: {
  surface: ActiveSurface;
  packet: ContextPacket;
  onOpen: () => void;
}) {
  const isWarning = surface === "browser";
  const label = isWarning ? "Untrusted page" : packet.dataLeavesDevice ? "Approval needed" : "Ask about this";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.94)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] shadow-[0_16px_44px_rgba(58,49,35,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white active:translate-y-px"
    >
      <span className={`h-2 w-2 rounded-full ${isWarning ? "bg-[var(--amber)]" : "bg-[var(--moss)]"}`} />
      Ekiek · {label}
    </button>
  );
}

export function AgentSidecar({
  open,
  surface,
  packet,
  request,
  onClose,
  onInspect,
  onOpenMemory,
  onRecompile
}: {
  open: boolean;
  surface: ActiveSurface;
  packet: ContextPacket;
  request: ContextRequest;
  onClose: () => void;
  onInspect: () => void;
  onOpenMemory: () => void;
  onRecompile: () => void;
}) {
  const suggestions =
    surface === "spreadsheet"
      ? ["Explain Q3 revenue", "Find fragile assumptions", "Inspect context"]
      : [...surfaceSuggestions[surface].slice(0, 2), "Inspect context"];
  const [answer, setAnswer] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setAnswer("");
    setMoreOpen(false);
  }, [surface]);

  function ask(suggestion: string) {
    if (suggestion.toLowerCase().includes("inspect")) {
      onInspect();
      return;
    }
    setAnswer(answerForSurface(surface));
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-5 right-5 top-5 z-50 flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.96)] shadow-[0_28px_90px_rgba(58,49,35,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between border-b border-[var(--line)] p-5">
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Ekiek</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                {surface === "spreadsheet"
                  ? "I can explain Q3 revenue using 2 ranges and 1 approved memory."
                  : `I understand the current ${surface} and can answer with cited context.`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
              aria-label="Close Ekiek"
            >
              <X size={17} />
            </button>
          </div>

          <div className="scrollbar-soft flex-1 overflow-auto p-5">
            <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="ekiek-ask">
              Ask about this
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="ekiek-ask"
                className="focus-ring min-w-0 flex-1 rounded-[14px] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--faint)]"
                placeholder="What matters here?"
              />
              <button
                type="button"
                onClick={() => setAnswer(answerForSurface(surface))}
                className="focus-ring grid h-12 w-12 place-items-center rounded-[14px] bg-[var(--ink)] text-[var(--canvas)] transition hover:bg-black active:translate-y-px"
                aria-label="Ask"
              >
                <Send size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => ask(suggestion)}
                  className="focus-ring w-full rounded-[14px] bg-[var(--canvas-2)] px-4 py-3 text-left text-sm font-medium text-[var(--ink)] transition hover:bg-[#e8e1d3] active:translate-y-px"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {answer ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-[18px] border border-[rgba(143,209,79,0.32)] bg-[rgba(143,209,79,0.1)] p-4"
              >
                <p className="text-sm leading-7 text-[var(--ink)]">{answer}</p>
              </motion.div>
            ) : null}

            <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[var(--panel)] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
                <Lock size={15} className="text-[var(--moss)]" />
                Context
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">
                {surface === "spreadsheet" ? "2 ranges" : `${packet.included.length} sources`} · {Math.min(packet.memories.length, 1)} memory ·{" "}
                {packet.dataLeavesDevice ? "approval before send" : "local"}
              </p>
              <button
                type="button"
                onClick={onInspect}
                className="focus-ring mt-3 text-sm font-medium text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-[var(--ink)]"
              >
                Inspect context
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="focus-ring mt-4 inline-flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
            >
              <MoreHorizontal size={16} />
              More
            </button>

            <AnimatePresence>
              {moreOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 grid gap-2">
                    <MoreAction icon={Inbox} label="Open memory inbox" onClick={onOpenMemory} />
                    <MoreAction icon={Settings} label="Privacy settings" onClick={() => undefined} />
                    <MoreAction icon={Plug} label="Connect Claude/Cursor" onClick={() => undefined} />
                    <MoreAction icon={Lock} label="Recompile context" onClick={onRecompile} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="border-t border-[var(--line)] px-5 py-4 text-xs text-[var(--muted)]">
            Model target: {request.modelTarget}. Data left device: {packet.dataLeavesDevice ? "yes" : "no"}.
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function MoreAction({
  icon: Icon,
  label,
  onClick
}: {
  icon: typeof Inbox;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring flex items-center gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-left text-sm text-[var(--ink)] transition hover:bg-[var(--canvas-2)] active:translate-y-px"
    >
      <Icon size={16} className="text-[var(--muted)]" />
      {label}
    </button>
  );
}
