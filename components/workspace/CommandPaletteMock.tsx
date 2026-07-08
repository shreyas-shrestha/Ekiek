"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

export function CommandPaletteMock({ open, onClose }: { open: boolean; onClose: () => void }) {
  const commands = [
    "Compile context packet",
    "Open memory inbox",
    "Preview Claude MCP packet",
    "Switch privacy mode",
    "Summon sidecar",
    "Inspect last packet"
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="mx-auto mt-24 max-w-xl overflow-hidden rounded-[10px] border hairline bg-[rgba(16,19,22,0.98)] shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b hairline px-4 py-3">
              <Search size={16} className="text-[var(--muted)]" />
              <input
                autoFocus
                placeholder="Search commands"
                className="focus-ring flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)]"
              />
              <button
                type="button"
                onClick={onClose}
                className="focus-ring grid h-7 w-7 place-items-center rounded-[6px] text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
                aria-label="Close command palette"
              >
                <X size={15} />
              </button>
            </div>
            <div className="p-2">
              {commands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={onClose}
                  className="focus-ring flex w-full items-center justify-between rounded-[7px] px-3 py-2 text-left text-sm text-[var(--paper-muted)] hover:bg-white/5 hover:text-[var(--text)]"
                >
                  <span>{command}</span>
                  <span className="mono text-[10px] text-[var(--muted)]">Enter</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
