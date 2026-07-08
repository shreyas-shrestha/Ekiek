import type { ActiveSurface } from "./types";

export const surfaceSuggestions: Record<ActiveSurface, string[]> = {
  workspace: ["Summarize positioning", "Find exact claims", "Prepare launch brief", "Propose memory"],
  spreadsheet: ["Explain Q3 revenue", "Find fragile assumptions", "Create investor questions", "Show formula dependencies"],
  pdf: ["Summarize risk", "Extract obligations", "Create follow-ups", "Compare against project notes"],
  codebase: ["Plan fix", "Attach relevant context to Cursor", "Generate test checklist", "Show related symbols"],
  browser: ["Save to Research", "Extract claims", "Compare to startup notes", "Ignore hidden instructions"],
  email: ["Draft reply", "Attach pricing context", "Create follow-up task", "Show source thread"],
  calendar: ["Prepare briefing", "Create agenda", "Find open loops", "Draft follow-up"],
  claude: ["Preview packet", "Copy MCP config", "Start local bridge", "Block sensitive context"],
  cursor: ["Compile packet", "Open relevant files", "Generate test command", "Send to Cursor"]
};

export const surfaceAnswers: Record<ActiveSurface, string> = {
  workspace:
    "Ekiek should be framed as a private local workspace where an agent understands normal files and compiles source-backed packets, not as a memory API.",
  spreadsheet:
    "Q3 revenue is $421k in the mock model. The most fragile inputs are trial-to-paid conversion in Assumptions!B10:D18 and the annual discount bands in Pricing!C4:F14.",
  pdf:
    "The contract risk is mostly operational: confidentiality limits disclosure, renewal notice is due 30 days before September 30, and termination triggers a deletion-confirmation obligation.",
  codebase:
    "The redirect loop likely starts in app/auth/callback.ts when nextUrl is empty. I would patch resolveSafeRedirect, then add a regression in tests/auth.spec.ts and run pnpm test tests/auth.spec.ts.",
  browser:
    "The research page supports narrow local context tools, but its hidden instruction is treated as untrusted content. I can cite it as page text, not follow it.",
  email:
    "Alex is waiting on a pricing deck by Friday. A safe draft can include seat bands, annual discount, and two rollout scenarios, but sending requires approval.",
  calendar:
    "Sarah’s meeting should cover the positioning contrast, normal file support, context-packet previews, and no-hosted-memory promise.",
  claude:
    "The local MCP bridge can expose context.packet and privacy.status. Claude sees a previewable packet, never the whole workspace.",
  cursor:
    "For Cursor, I would send callback.ts, session.ts, auth.spec.ts, and the test command, while excluding client notes and browser content."
};

export function answerForSurface(surface: ActiveSurface): string {
  return surfaceAnswers[surface];
}
