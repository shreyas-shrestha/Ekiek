"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ContextPacket, ContextRequest } from "@/lib/context/types";
import { AgentTraceTimeline } from "./AgentTraceTimeline";
import { SourceCitation } from "./SourceCitation";

export function ContextPacketInspector({
  open,
  packet,
  request,
  onClose
}: {
  open: boolean;
  packet: ContextPacket;
  request: ContextRequest;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed right-5 top-5 z-50 flex h-[calc(100dvh-2.5rem)] w-[min(92vw,440px)] flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.96)] shadow-[0_28px_90px_rgba(58,49,35,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between border-b border-[var(--line)] p-5">
            <div>
              <p className="text-sm text-[var(--muted)]">Context packet</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">What Ekiek used</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {request.modelTarget} · {request.privacyMode.replaceAll("_", " ")} · data left device:{" "}
                {packet.dataLeavesDevice ? "yes" : "no"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
              aria-label="Close inspector"
            >
              <X size={16} />
            </button>
          </div>
          <div className="scrollbar-soft flex-1 space-y-5 overflow-auto p-5">
            <section>
              <h3 className="mb-2 text-sm font-medium text-[var(--ink)]">Packet summary</h3>
              <p className="text-sm leading-relaxed text-[var(--paper-muted)]">{packet.summary}</p>
            </section>
            {packet.warnings.length > 0 ? (
              <section className="rounded-[18px] border border-[rgba(217,154,43,0.28)] bg-[rgba(217,154,43,0.1)] p-4">
                <h3 className="mb-2 text-sm font-medium text-[var(--warning)]">Warnings</h3>
                <ul className="space-y-1 text-xs leading-relaxed text-[var(--paper-muted)]">
                  {packet.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section>
              <h3 className="mb-3 text-sm font-medium text-[var(--ink)]">Included</h3>
              <div className="space-y-2">
                {packet.included.map((item) => (
                  <div key={item.source.id} className="rounded-[18px] border border-[var(--line)] bg-[var(--panel)] p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-[var(--ink)]">{item.source.title}</p>
                      <span className="mono text-[11px] text-[var(--moss)]">{item.score}</span>
                    </div>
                    <p className="mb-2 text-xs leading-relaxed text-[var(--muted)]">{item.reason}</p>
                    <SourceCitation source={item.source} />
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-medium text-[var(--ink)]">Excluded</h3>
              <div className="space-y-2">
                {packet.excluded.slice(0, 8).map((item) => (
                  <div key={item.source.id} className="rounded-[18px] border border-[var(--line)] bg-[var(--canvas-2)] p-4">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <p className="truncate text-sm text-[var(--paper-muted)]">{item.source.title}</p>
                      <span className="mono text-[11px] text-[var(--muted)]">{item.score}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--muted)]">{item.reason}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-medium text-[var(--ink)]">Approved memories</h3>
              <div className="space-y-2">
                {packet.memories.map((memory) => (
                  <div key={memory.id} className="rounded-[18px] border border-[var(--line)] bg-[var(--panel)] p-4">
                    <p className="text-sm text-[var(--ink)]">{memory.content}</p>
                    <p className="mono mt-2 text-[11px] text-[var(--muted)]">
                      {memory.type} · {Math.round(memory.confidence * 100)}% confidence
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-medium text-[var(--ink)]">Trace</h3>
              <AgentTraceTimeline warnings={packet.warnings} />
            </section>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
