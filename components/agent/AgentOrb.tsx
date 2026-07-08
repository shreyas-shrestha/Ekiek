"use client";

import { motion } from "framer-motion";
import { CircleDotDashed } from "lucide-react";

export function AgentOrb({ docked = true, label = "Ekiek" }: { docked?: boolean; label?: string }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-2 rounded-full border hairline bg-[rgba(16,19,22,0.88)] px-2.5 py-2 shadow-xl shadow-black/30 backdrop-blur-xl"
    >
      <motion.span
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(183,243,107,0.14)] text-[var(--moss)]"
      >
        <CircleDotDashed size={16} />
      </motion.span>
      <span className="text-xs font-medium text-[var(--text)]">{label}</span>
      <span className="mono rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-[var(--muted)]">
        {docked ? "docked" : "quiet"}
      </span>
    </motion.div>
  );
}
