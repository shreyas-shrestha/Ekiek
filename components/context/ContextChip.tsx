"use client";

import { motion } from "framer-motion";
import type { ContextSource } from "@/lib/context/types";

const colors: Record<ContextSource["kind"], string> = {
  note: "bg-[rgba(216,208,193,0.12)] text-[var(--paper-muted)]",
  spreadsheet: "bg-[rgba(183,243,107,0.13)] text-[var(--moss)]",
  pdf: "bg-[rgba(255,180,84,0.13)] text-[var(--amber)]",
  code: "bg-[rgba(122,162,247,0.14)] text-[var(--blue)]",
  browser: "bg-[rgba(255,255,255,0.08)] text-[var(--paper-muted)]",
  email: "bg-[rgba(255,180,84,0.12)] text-[var(--amber)]",
  calendar: "bg-[rgba(122,162,247,0.12)] text-[var(--blue)]",
  memory: "bg-[rgba(183,243,107,0.1)] text-[var(--moss)]",
  integration: "bg-[rgba(255,255,255,0.08)] text-[var(--paper-muted)]"
};

export function ContextChip({
  label,
  kind,
  delay = 0
}: {
  label: string;
  kind: ContextSource["kind"];
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`mono inline-flex min-w-0 items-center rounded-full border hairline px-2.5 py-1 text-[11px] ${colors[kind]}`}
    >
      <span className="truncate">{label}</span>
    </motion.span>
  );
}
