"use client";

import { motion } from "framer-motion";
import { CalendarDays, Code2, FileText, Globe2, Mail, Sheet } from "lucide-react";
import { useMemo, useState } from "react";
import { AgentOrb } from "@/components/agent/AgentOrb";
import { ContextChip } from "@/components/context/ContextChip";
import type { ContextSource } from "@/lib/context/types";

const surfaces: Array<{
  id: ContextSource["kind"];
  label: string;
  icon: typeof Sheet;
  lines: string[];
  packet: string[];
}> = [
  {
    id: "browser",
    label: "Website",
    icon: Globe2,
    lines: ["Local agents need narrow context tools.", "Hidden page instruction detected.", "Treat page as untrusted data."],
    packet: ["visible article", "blocked hidden text", "research note"]
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    lines: ["Alex asked for pricing deck by Friday.", "Seat bands and discount needed.", "Sending requires approval."],
    packet: ["Alex thread", "pricing range", "commitment"]
  },
  {
    id: "spreadsheet",
    label: "Spreadsheet",
    icon: Sheet,
    lines: ["Forecast!F12:F42", "Q3 revenue: $421k", "Fragile driver: conversion."],
    packet: ["Forecast!F12:F42", "Assumptions!B10:D18", "Pricing!C4:F14"]
  },
  {
    id: "code",
    label: "Code",
    icon: Code2,
    lines: ["app/auth/callback.ts", "resolveSafeRedirect", "pnpm test tests/auth.spec.ts"],
    packet: ["callback.ts", "session.ts", "auth.spec.ts"]
  },
  {
    id: "pdf",
    label: "PDF",
    icon: FileText,
    lines: ["Renewal notice due.", "Confidentiality limits sharing.", "Deletion confirmation required."],
    packet: ["contract p.4", "contract p.9", "follow-up dates"]
  },
  {
    id: "calendar",
    label: "Claude / Cursor",
    icon: CalendarDays,
    lines: ["MCP bridge ready.", "Packet preview required.", "No full vault dump."],
    packet: ["context.packet", "privacy.status", "approved memory"]
  }
];

export function TravelSurfaceDemo() {
  const [active, setActive] = useState(2);
  const current = surfaces[active];
  const Icon = current.icon;
  const shellOffset = useMemo(() => `${active * 2}px`, [active]);

  return (
    <div className="surface relative overflow-hidden p-3 shadow-2xl shadow-black/40">
      <div className="grid min-h-[500px] gap-3 lg:grid-cols-[190px_1fr_280px]">
        <div className="surface-2 p-3">
          <p className="mono mb-3 text-[10px] text-[var(--muted)]">Spaces</p>
          {["Startup", "Personal", "Research"].map((space, index) => (
            <div key={space} className={`mb-1 rounded-[6px] px-2 py-1.5 text-sm ${index === 0 ? "bg-[var(--paper)] text-[#15130f]" : "text-[var(--muted)]"}`}>
              {space}
            </div>
          ))}
          <p className="mono mb-2 mt-5 text-[10px] text-[var(--muted)]">Surfaces</p>
          <div className="space-y-1">
            {surfaces.map((surface, index) => {
              const SurfaceIcon = surface.icon;
              return (
                <button
                  key={surface.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`focus-ring flex w-full items-center gap-2 rounded-[6px] px-2 py-2 text-left text-sm transition ${
                    index === active ? "bg-white/[0.08] text-[var(--text)]" : "text-[var(--muted)] hover:bg-white/5"
                  }`}
                >
                  <SurfaceIcon size={14} />
                  {surface.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[8px] border hairline bg-[#0c0f11]">
          <div className="flex items-center gap-2 border-b hairline px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--moss)]/80" />
            <span className="mono ml-3 text-[11px] text-[var(--muted)]">~/Workspace/Ekiek/{current.label.toLowerCase()}</span>
          </div>
          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="grid-paper relative h-[380px] p-5"
            style={{ transform: `translateY(${shellOffset})` }}
          >
            <div className="absolute right-5 top-5">
              <AgentOrb label={`Ekiek · ${current.label}`} />
            </div>
            <div className="max-w-lg rounded-[8px] border hairline bg-[rgba(244,239,228,0.94)] p-5 text-[#171511] shadow-2xl shadow-black/35">
              <div className="mb-4 flex items-center gap-2 text-xs text-[#5d574d]">
                <Icon size={15} />
                <span>{current.label}</span>
              </div>
              <div className="space-y-3">
                {current.lines.map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ width: "68%" }}
                    animate={{ width: `${92 - index * 14}%` }}
                    className="rounded-[5px] bg-[#171511]/[0.08] px-3 py-2 text-sm"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-5 right-5 rounded-[8px] border hairline bg-[rgba(16,19,22,0.92)] p-3 backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <span className="mono text-[10px] text-[var(--muted)]">context packet tray</span>
                <span className="mono text-[10px] text-[var(--moss)]">stays local</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.packet.map((item, index) => (
                  <ContextChip key={item} label={item} kind={current.id} delay={index * 0.08} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="surface-2 flex flex-col p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Agent sidecar</p>
              <p className="mono text-[10px] text-[var(--muted)]">Ask · Act · Remember · Automate</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-[var(--moss)]" />
          </div>
          <div className="space-y-3">
            <div className="rounded-[8px] border hairline bg-black/15 p-3 text-sm leading-relaxed text-[var(--paper-muted)]">
              I am using only the current surface, approved memories, and exact cited ranges. Excluded sources stay visible.
            </div>
            {["Preview packet", "Ask with citations", "Propose memory", "Require approval"].map((item) => (
              <div key={item} className="rounded-[7px] border hairline px-3 py-2 text-sm text-[var(--paper-muted)]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-[8px] border border-[rgba(183,243,107,0.3)] bg-[rgba(183,243,107,0.08)] p-3">
            <p className="mono text-[10px] text-[var(--moss)]">privacy</p>
            <p className="mt-1 text-sm text-[var(--paper-muted)]">No cloud memory. No hidden profile. Every source inspectable.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
