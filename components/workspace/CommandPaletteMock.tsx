"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

export function CommandPaletteMock({ open, onClose }: { open: boolean; onClose: () => void }) {
  const commands = [
    "Ask about current file",
    "Inspect context",
    "Switch file",
    "Open memory inbox",
    "Connect Claude/Cursor",
    "Privacy settings"
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
            className="mx-auto mt-24 max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(17,19,17,0.98)] shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={16} className="text-[rgba(247,244,238,0.55)]" />
              <input
                autoFocus
                placeholder="Search commands"
                className="focus-ring flex-1 bg-transparent text-sm text-[var(--canvas)] placeholder:text-[rgba(247,244,238,0.48)]"
              />
              <button
                type="button"
                onClick={onClose}
                className="focus-ring grid h-8 w-8 place-items-center rounded-full text-[rgba(247,244,238,0.6)] hover:bg-white/10 hover:text-white"
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
                  className="focus-ring flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-left text-sm text-[rgba(247,244,238,0.78)] hover:bg-white/10 hover:text-white"
                >
                  <span>{command}</span>
                  <span className="mono text-[10px] text-[rgba(247,244,238,0.42)]">Enter</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
