"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Memory } from "@/lib/context/types";
import { MemoryCard } from "./MemoryCard";

export function MemoryInbox({
  open,
  memories,
  onClose,
  onApprove,
  onReject
}: {
  open: boolean;
  memories: Memory[];
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const proposed = memories.filter((memory) => !memory.approved);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ x: -420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -420, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed left-20 top-5 z-50 flex h-[calc(100dvh-2.5rem)] w-[min(92vw,420px)] flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.96)] shadow-[0_28px_90px_rgba(58,49,35,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between border-b border-[var(--line)] p-5">
            <div>
              <p className="text-sm text-[var(--muted)]">Memory inbox</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">Proposed memories</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">Nothing becomes memory until you approve it.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
              aria-label="Close memory inbox"
            >
              <X size={16} />
            </button>
          </div>
          <div className="scrollbar-soft flex-1 space-y-3 overflow-auto p-4">
            {proposed.length > 0 ? (
              proposed.map((memory) => <MemoryCard key={memory.id} memory={memory} onApprove={onApprove} onReject={onReject} />)
            ) : (
              <div className="surface-2 p-4 text-sm leading-relaxed text-[var(--muted)]">
                The inbox is clear. Approved memories stay inspectable in every context packet.
              </div>
            )}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
