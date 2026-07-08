"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Code2, FileText, FolderOpen, Globe2, Mail, Search, Settings, Sheet } from "lucide-react";
import { useState } from "react";
import { fileItems } from "@/lib/context/mock-data";
import type { ActiveSurface } from "@/lib/context/types";

const icons: Record<ActiveSurface, typeof FileText> = {
  workspace: FileText,
  spreadsheet: Sheet,
  pdf: FileText,
  codebase: Code2,
  browser: Globe2,
  email: Mail,
  calendar: CalendarDays,
  claude: Code2,
  cursor: Code2
};

export function SlimRail({
  activeId,
  activeSpace,
  onSelect,
  onSpaceChange,
  onCommand
}: {
  activeId: string;
  activeSpace: string;
  onSelect: (id: string) => void;
  onSpaceChange: (space: string) => void;
  onCommand: () => void;
}) {
  const [open, setOpen] = useState<"files" | "settings" | null>(null);

  function selectFile(id: string) {
    onSelect(id);
    setOpen(null);
  }

  return (
    <aside className="relative z-30 flex w-16 shrink-0 flex-col items-center gap-2 bg-[var(--sidebar)] px-2 py-3 text-[var(--canvas)]">
      <button
        type="button"
        onClick={() => setOpen(open === "files" ? null : "files")}
        className="focus-ring mb-4 grid h-11 w-11 place-items-center rounded-[14px] bg-[var(--sidebar-2)] text-sm font-semibold text-[var(--moss)] transition hover:bg-white/10"
        aria-label="Open Ekiek files"
      >
        Ek
      </button>
      <RailButton active={open === "files"} label="Files" onClick={() => setOpen(open === "files" ? null : "files")}>
        <FolderOpen size={19} />
      </RailButton>
      <RailButton label="Command" onClick={onCommand}>
        <Search size={19} />
      </RailButton>
      <div className="flex-1" />
      <RailButton active={open === "settings"} label="Settings" onClick={() => setOpen(open === "settings" ? null : "settings")}>
        <Settings size={19} />
      </RailButton>

      <AnimatePresence>
        {open === "files" ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-[4.5rem] top-3 w-[280px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.96)] p-3 text-[var(--ink)] shadow-[0_24px_80px_rgba(58,49,35,0.18)] backdrop-blur-xl"
          >
            <div className="mb-3 flex gap-1 rounded-[14px] bg-[var(--canvas-2)] p-1">
              {["Startup", "Personal", "Work"].map((space) => (
                <button
                  key={space}
                  type="button"
                  onClick={() => onSpaceChange(space)}
                  className={`focus-ring flex-1 rounded-[11px] px-2 py-2 text-xs transition ${
                    activeSpace === space ? "bg-white text-[var(--ink)] shadow-sm" : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {space}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              {fileItems.map((item) => {
                const Icon = icons[item.surface as ActiveSurface];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectFile(item.id)}
                    className={`focus-ring flex w-full min-w-0 items-center gap-3 rounded-[14px] px-3 py-3 text-left text-sm transition ${
                      activeId === item.id ? "bg-[var(--ink)] text-[var(--canvas)]" : "text-[var(--muted)] hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}

        {open === "settings" ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute bottom-3 left-[4.5rem] w-[260px] rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.96)] p-4 text-[var(--ink)] shadow-[0_24px_80px_rgba(58,49,35,0.18)] backdrop-blur-xl"
          >
            <p className="text-sm font-semibold">Settings</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Privacy is fully local. Model target is local. Advanced controls live here, away from the workspace.</p>
            <a href="/integrations" className="mt-4 inline-flex text-sm font-medium text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4">
              Connect Claude/Cursor
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </aside>
  );
}

function RailButton({
  active = false,
  label,
  onClick,
  children
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring grid h-11 w-11 place-items-center rounded-[14px] transition ${
        active ? "bg-[var(--canvas)] text-[var(--sidebar)]" : "text-[rgba(247,244,238,0.68)] hover:bg-white/10 hover:text-white"
      }`}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export function FileRail({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return <SlimRail activeId={activeId} activeSpace="Startup" onSelect={onSelect} onSpaceChange={() => undefined} onCommand={() => undefined} />;
}
