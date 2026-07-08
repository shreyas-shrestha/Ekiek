import { AlertTriangle, CalendarDays, Code2, FileText, Globe2, Mail } from "lucide-react";
import type { ContextSource } from "@/lib/context/types";

export function SpreadsheetViewer() {
  const headers = ["Metric", "Jul", "Aug", "Sep", "Q3"];
  const rows = [
    ["Trials", "4,800", "5,250", "5,700", "15,750"],
    ["Paid seats", "1,220", "1,430", "1,710", "4,360"],
    ["Conversion", "4.2%", "4.7%", "5.1%", "4.7%"],
    ["Expansion", "$18k", "$29k", "$36k", "$83k"],
    ["Revenue", "$118k", "$139k", "$164k", "$421k"]
  ];

  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {["Forecast", "Assumptions", "Pricing", "Hiring"].map((sheet, index) => (
          <span
            key={sheet}
            className={`rounded-full px-3 py-1.5 text-sm ${
              index === 0 ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--canvas-2)] text-[var(--muted)]"
            }`}
          >
            {sheet}
          </span>
        ))}
      </div>
      <div className="mb-4 inline-flex rounded-full bg-[rgba(143,209,79,0.13)] px-3 py-1.5 text-sm text-[#486b24]">
        Highlighted: Forecast!F12:F42 and Assumptions!B10:D18
      </div>
      <div className="scrollbar-soft overflow-auto rounded-[22px] border border-[var(--line)] bg-white">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--canvas-2)] text-[var(--muted)]">
              {headers.map((header) => (
                <th key={header} className="border-r border-[var(--line)] px-5 py-4 text-left font-medium last:border-r-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-[var(--line)]">
                {row.map((cell, index) => (
                  <td
                    key={`${row[0]}-${cell}`}
                    className={`border-r border-[var(--line)] px-5 py-5 last:border-r-0 ${
                      row[0] === "Revenue" || row[0] === "Conversion" ? "bg-[rgba(143,209,79,0.1)]" : ""
                    } ${index === 0 ? "text-[var(--muted)]" : "font-medium text-[var(--ink)]"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Formula preview: <span className="mono text-[var(--ink)]">F24 = SUM(F12:F23) * Assumptions!C14</span>
      </p>
    </div>
  );
}

export function PdfViewerMock() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="paper mx-auto min-h-[680px] max-w-[720px] rounded-[10px] border border-[var(--line)] p-10 shadow-[0_24px_80px_rgba(58,49,35,0.12)]">
        <p className="mb-12 text-sm text-[var(--muted)]">contract.pdf / page 4</p>
        <h2 className="mb-6 text-4xl font-semibold tracking-[-0.02em]">Contract risk summary</h2>
        <div className="space-y-6 text-base leading-8 text-[var(--ink)]">
          <p>Confidentiality limits disclosure of client materials and requires internal controls before sharing with external processors.</p>
          <p>Renewal auto-renews on September 30 unless notice is sent 30 days prior. Termination for convenience requires 15 days notice.</p>
          <p className="rounded-[18px] bg-[rgba(217,154,43,0.13)] p-5">
            Data handling obligation: deletion confirmation is due within 10 business days after termination.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CodebaseViewer() {
  return (
    <div className="h-full overflow-auto bg-[#111311] p-6 text-[var(--canvas)]">
      <div className="mb-5 flex items-center gap-3 text-sm text-[rgba(247,244,238,0.62)]">
        <Code2 size={16} />
        auth-codebase / app/auth/callback.ts
      </div>
      <pre className="scrollbar-soft overflow-auto rounded-[22px] border border-white/10 bg-[#191b18] p-6 text-sm leading-7 text-[rgba(247,244,238,0.82)]">
        <code>{`export function resolveSafeRedirect(nextUrl?: string) {
  const fallback = "/app";
  if (!nextUrl) return fallback;

  const target = new URL(nextUrl, "https://ekiek.local");
  if (target.origin !== "https://ekiek.local") return fallback;

  return target.pathname + target.search;
}

// regression
// pnpm test tests/auth.spec.ts`}</code>
      </pre>
    </div>
  );
}

export function BrowserSurfaceMock() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl rounded-[24px] border border-[var(--line)] bg-white p-8 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Globe2 size={16} />
            example.local/research/local-agents
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(217,154,43,0.13)] px-3 py-1.5 text-sm text-[#7a5419]">
            <AlertTriangle size={14} />
            Untrusted page content
          </span>
        </div>
        <h2 className="mb-5 text-4xl font-semibold tracking-[-0.02em]">Local agents need narrow context tools</h2>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Local-first agents can expose document context through explicit capabilities, including MCP tools and local APIs. Embedded page instructions remain page content.
        </p>
      </div>
    </div>
  );
}

export function EmailThreadViewer() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl">
        <SurfaceKicker icon={Mail} text="Gmail thread / Alex" />
        <div className="space-y-3">
          {[
            ["Alex", "Can you send the pricing deck by Friday? I need seat bands, annual discount, and two rollout scenarios."],
            ["You", "Yes. I will send the deck Friday with Q3 assumptions and rollout options."]
          ].map(([name, body]) => (
            <div key={body} className="rounded-[22px] border border-[var(--line)] bg-white p-5">
              <p className="mb-2 text-sm font-semibold text-[var(--ink)]">{name}</p>
              <p className="text-base leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CalendarEventViewer() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl rounded-[26px] border border-[var(--line)] bg-white p-8 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
        <SurfaceKicker icon={CalendarDays} text="Tomorrow / 10:00 AM" />
        <h2 className="mb-6 text-4xl font-semibold tracking-[-0.02em]">Meeting with Sarah about positioning</h2>
        <div className="space-y-3 text-base text-[var(--muted)]">
          <p>Contrast Ekiek with memory APIs.</p>
          <p>Show normal file support.</p>
          <p>Clarify no hosted memory.</p>
        </div>
      </div>
    </div>
  );
}

export function NoteViewer() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="paper mx-auto max-w-3xl rounded-[18px] border border-[var(--line)] p-10 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
        <p className="mb-10 text-sm text-[var(--muted)]">launch-plan.md</p>
        <h2 className="mb-5 text-4xl font-semibold tracking-[-0.02em]">A local workspace your agent can understand</h2>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Ekiek reads normal files, keeps memory inspectable, and compiles the smallest useful packet for each tool.
        </p>
      </div>
    </div>
  );
}

export function IntegrationSurfaceViewer() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl rounded-[26px] border border-[var(--line)] bg-white p-8 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
        <SurfaceKicker icon={Code2} text="Local bridge" />
        <h2 className="mb-5 text-4xl font-semibold tracking-[-0.02em]">Claude receives a packet, not the workspace.</h2>
        <pre className="scrollbar-soft overflow-auto rounded-[18px] bg-[var(--sidebar)] p-5 text-sm leading-7 text-[var(--canvas)]">
          <code>{`{
  "mcpServers": {
    "ekiek": {
      "command": "ekiek",
      "args": ["serve-mcp"],
      "env": { "EKIEK_MODE": "local" }
    }
  }
}`}</code>
        </pre>
      </div>
    </div>
  );
}

export function UniversalViewer({ source }: { source: ContextSource }) {
  if (source.surface === "spreadsheet") return <SpreadsheetViewer />;
  if (source.surface === "pdf") return <PdfViewerMock />;
  if (source.surface === "codebase") return <CodebaseViewer />;
  if (source.surface === "browser") return <BrowserSurfaceMock />;
  if (source.surface === "email") return <EmailThreadViewer />;
  if (source.surface === "calendar") return <CalendarEventViewer />;
  if (source.surface === "claude" || source.surface === "cursor") return <IntegrationSurfaceViewer />;
  return <NoteViewer />;
}

function SurfaceKicker({ icon: Icon, text }: { icon: typeof FileText; text: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-sm text-[var(--muted)]">
      <Icon size={16} />
      {text}
    </div>
  );
}
