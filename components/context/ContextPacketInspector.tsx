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
          className="fixed right-3 top-20 z-50 flex h-[calc(100dvh-6rem)] w-[min(92vw,420px)] flex-col overflow-hidden rounded-[10px] border hairline bg-[rgba(16,19,22,0.96)] shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between border-b hairline p-4">
            <div>
              <p className="mono text-[11px] text-[var(--moss)]">{packet.id}</p>
              <h2 className="mt-1 text-lg font-semibold">Context Inspector</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {request.modelTarget} · {request.privacyMode.replaceAll("_", " ")} · data left device:{" "}
                {packet.dataLeavesDevice ? "yes" : "no"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring grid h-8 w-8 place-items-center rounded-[6px] border hairline text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
              aria-label="Close inspector"
            >
              <X size={16} />
            </button>
          </div>
          <div className="scrollbar-soft flex-1 space-y-5 overflow-auto p-4">
            <section>
              <h3 className="mb-2 text-sm font-medium">Packet summary</h3>
              <p className="text-sm leading-relaxed text-[var(--paper-muted)]">{packet.summary}</p>
            </section>
            {packet.warnings.length > 0 ? (
              <section className="rounded-[8px] border border-[rgba(255,180,84,0.28)] bg-[rgba(255,180,84,0.08)] p-3">
                <h3 className="mb-2 text-sm font-medium text-[var(--warning)]">Warnings</h3>
                <ul className="space-y-1 text-xs leading-relaxed text-[var(--paper-muted)]">
                  {packet.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section>
              <h3 className="mb-3 text-sm font-medium">Included sources</h3>
              <div className="space-y-2">
                {packet.included.map((item) => (
                  <div key={item.source.id} className="surface-2 p-3">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="text-sm text-[var(--text)]">{item.source.title}</p>
                      <span className="mono text-[11px] text-[var(--moss)]">{item.score}</span>
                    </div>
                    <p className="mb-2 text-xs leading-relaxed text-[var(--muted)]">{item.reason}</p>
                    <SourceCitation source={item.source} />
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-medium">Excluded sources</h3>
              <div className="space-y-2">
                {packet.excluded.slice(0, 8).map((item) => (
                  <div key={item.source.id} className="rounded-[8px] border hairline bg-black/10 p-3">
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
              <h3 className="mb-3 text-sm font-medium">Approved memories</h3>
              <div className="space-y-2">
                {packet.memories.map((memory) => (
                  <div key={memory.id} className="surface-2 p-3">
                    <p className="text-sm text-[var(--text)]">{memory.content}</p>
                    <p className="mono mt-2 text-[11px] text-[var(--muted)]">
                      {memory.type} · {Math.round(memory.confidence * 100)}% confidence
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-medium">Trace</h3>
              <AgentTraceTimeline warnings={packet.warnings} />
            </section>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
