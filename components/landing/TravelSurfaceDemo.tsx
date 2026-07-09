"use client";

import { motion } from "framer-motion";

export function TravelSurfaceDemo() {
  return (
    <div className="relative mx-auto h-[430px] w-full min-w-0 max-w-[860px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(58,49,35,0.14)]">
      <div className="flex h-12 items-center justify-between border-b border-[var(--line)] bg-[var(--panel-2)] px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--ink)]">My personal agent</p>
          <p className="truncate text-xs text-[var(--muted)]">Startup / local context</p>
        </div>
        <span className="hidden rounded-full bg-[rgba(143,209,79,0.16)] px-3 py-1 text-xs text-[#486b24] sm:inline-flex">7 sources · 3 memories · local</span>
      </div>

      <div className="grid h-[calc(100%-3rem)] grid-cols-1 md:grid-cols-[1fr_120px]">
        <div className="min-w-0 p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {["Files", "Notes", "Browser", "Email", "Calendar", "Code"].map((source, index) => (
              <span
                key={source}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  index === 0 ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--canvas-2)] text-[var(--muted)]"
                }`}
              >
                {source}
              </span>
            ))}
          </div>

          <div className="rounded-[22px] border border-[var(--line)] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">Ask</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-[var(--ink)]">
              What should I know before Sarah&apos;s meeting?
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {["launch-plan.md", "calendar: Sarah", "Alex pricing thread"].map((item) => (
                <span key={item} className="rounded-full bg-[var(--canvas-2)] px-3 py-1.5 text-xs text-[var(--muted)]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-4 rounded-[22px] border border-[rgba(143,209,79,0.32)] bg-[rgba(143,209,79,0.1)] p-5"
          >
            <p className="text-sm font-medium text-[var(--ink)]">Ekiek</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Sarah wants positioning clarity. Use the launch plan, the calendar agenda, and the pricing thread. Avoid client notes.
            </p>
          </motion.div>
        </div>

        <div className="relative hidden border-l border-[var(--line)] bg-[var(--canvas-2)] md:block">
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute -left-28 top-20 w-56 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_18px_54px_rgba(58,49,35,0.14)] backdrop-blur"
          >
            <p className="text-xs text-[var(--muted)]">Included</p>
            <div className="mt-3 space-y-2 text-sm text-[var(--ink)]">
              <p>launch-plan.md</p>
              <p>calendar-meeting-sarah</p>
              <p>gmail-thread-alex</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="absolute -left-24 bottom-16 w-48 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_18px_54px_rgba(58,49,35,0.14)] backdrop-blur"
          >
            <p className="text-xs text-[var(--muted)]">Excluded</p>
            <p className="mt-3 text-sm text-[var(--ink)]">Client A notes</p>
          </motion.div>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="absolute -left-24 top-1/2 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] shadow-[0_14px_44px_rgba(58,49,35,0.15)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--moss)]" />
            Ask agent
          </motion.button>
        </div>
      </div>
    </div>
  );
}
