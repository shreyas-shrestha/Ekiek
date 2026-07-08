"use client";

import { motion } from "framer-motion";

export function TravelSurfaceDemo() {
  return (
    <div className="relative mx-auto h-[430px] max-w-[860px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(58,49,35,0.14)]">
      <div className="flex h-12 items-center justify-between border-b border-[var(--line)] bg-[var(--panel-2)] px-5">
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">financial-model.xlsx</p>
          <p className="text-xs text-[var(--muted)]">Startup / Forecast</p>
        </div>
        <span className="rounded-full bg-[rgba(143,209,79,0.16)] px-3 py-1 text-xs text-[#486b24]">3 sources · 1 memory · local</span>
      </div>

      <div className="grid h-[calc(100%-3rem)] grid-cols-[1fr_96px]">
        <div className="p-6">
          <div className="mb-5 flex gap-2">
            {["Forecast", "Assumptions", "Pricing"].map((sheet, index) => (
              <span
                key={sheet}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  index === 0 ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--canvas-2)] text-[var(--muted)]"
                }`}
              >
                {sheet}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[var(--line)]">
            <div className="grid grid-cols-5 bg-[var(--canvas-2)] text-xs text-[var(--muted)]">
              {["Metric", "Jul", "Aug", "Sep", "Q3"].map((cell) => (
                <div key={cell} className="border-r border-[var(--line)] px-4 py-3 last:border-r-0">
                  {cell}
                </div>
              ))}
            </div>
            {[
              ["Paid seats", "1,220", "1,430", "1,710", "4,360"],
              ["Conversion", "4.2%", "4.7%", "5.1%", "4.7%"],
              ["Expansion", "$18k", "$29k", "$36k", "$83k"],
              ["Revenue", "$118k", "$139k", "$164k", "$421k"]
            ].map((row) => (
              <div key={row[0]} className="grid grid-cols-5 border-t border-[var(--line)] text-sm">
                {row.map((cell, index) => (
                  <div
                    key={`${row[0]}-${cell}`}
                    className={`border-r border-[var(--line)] px-4 py-4 last:border-r-0 ${
                      row[0] === "Revenue" || row[0] === "Conversion" ? "bg-[rgba(143,209,79,0.1)]" : ""
                    } ${index === 0 ? "text-[var(--muted)]" : "font-medium text-[var(--ink)]"}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative border-l border-[var(--line)] bg-[var(--canvas-2)]">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute -left-24 top-24 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] shadow-[0_14px_44px_rgba(58,49,35,0.15)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--moss)]" />
            Ekiek · Ask about this
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="absolute -left-40 bottom-16 w-72 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_20px_60px_rgba(58,49,35,0.14)] backdrop-blur"
          >
            <p className="text-sm font-medium text-[var(--ink)]">I can explain Q3 revenue.</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Using Forecast!F12:F42, Assumptions!B10:D18, and one approved writing preference.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
