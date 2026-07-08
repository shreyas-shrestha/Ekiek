import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Network, ShieldCheck } from "lucide-react";
import { TravelSurfaceDemo } from "@/components/landing/TravelSurfaceDemo";
import { PageChrome } from "@/components/ui/PageChrome";

const fragments = ["Notes", "Excel", "PDF", "Browser", "Claude", "Cursor", "Calendar", "Email"];
const files = ["Excel workbook", "PDF contract", "Markdown note", "Office document", "Codebase", "Browser capture"];
const tools = ["Claude", "ChatGPT", "Cursor", "VS Code", "Ollama", "LM Studio", "MCP", "Local API"];

export default function LandingPage() {
  return (
    <PageChrome>
      <section className="relative mx-auto max-w-[1500px] px-4 pb-8 pt-6 sm:px-6 lg:pt-8">
        <div className="relative min-h-[500px] overflow-hidden rounded-[14px] border hairline bg-[rgba(16,19,22,0.72)] p-3">
          <TravelSurfaceDemo />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[68%] bg-[linear-gradient(90deg,#090b0d_0%,rgba(9,11,13,0.92)_48%,rgba(9,11,13,0)_100%)]" />
          <div className="pointer-events-none absolute left-6 top-6 max-w-2xl p-5 sm:left-8 sm:top-8">
            <p className="mono mb-3 text-[11px] text-[var(--moss)]">EK-ee-ek / local personal agent</p>
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-normal text-[var(--text)] sm:text-5xl">
              Your personal agent, native everywhere.
            </h1>
            <p className="mt-4 max-w-[54ch] text-base leading-7 text-[var(--paper-muted)]">
              Ekiek turns files, apps, browser, and AI tools into one private workspace with exact context packets.
            </p>
            <div className="pointer-events-auto mt-5 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="focus-ring inline-flex items-center gap-2 rounded-[7px] bg-[var(--paper)] px-4 py-2.5 text-sm font-medium text-[#15130f] transition hover:bg-white active:translate-y-px"
              >
                Open the workspace
                <ArrowRight size={15} />
              </Link>
              <a
                href="#travels"
                className="focus-ring inline-flex items-center gap-2 rounded-[7px] border hairline bg-black/20 px-4 py-2.5 text-sm text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
              >
                See context travel
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-normal sm:text-5xl">AI tools forget the room.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
              Your work has context. Every new model, tab, and session usually starts with a tiny slice of the truth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {fragments.map((fragment, index) => (
              <div
                key={fragment}
                className={`rounded-[8px] border hairline p-4 ${index % 3 === 0 ? "bg-[var(--paper)] text-[#15130f]" : "bg-[var(--panel-2)] text-[var(--paper-muted)]"}`}
              >
                <p className="text-sm font-medium">{fragment}</p>
                <p className="mono mt-4 text-[10px] opacity-70">source {String(index + 1).padStart(2, "0")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="travels" className="border-y hairline bg-[rgba(255,255,255,0.018)] py-20">
        <div className="mx-auto grid max-w-[1300px] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="surface p-4">
            <div className="grid gap-3 md:grid-cols-3">
              {["website", "email", "spreadsheet", "code editor", "PDF", "Claude"].map((surface, index) => (
                <div key={surface} className={`min-h-[150px] rounded-[8px] border hairline p-3 ${index === 2 ? "bg-[rgba(183,243,107,0.1)]" : "bg-black/15"}`}>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="mono text-[10px] text-[var(--muted)]">{surface}</span>
                    <span className="h-2 w-2 rounded-full bg-[var(--moss)]" />
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--paper-muted)]">
                    {index === 2 ? "Forecast!F12:F42 moves with the task." : "The same sidecar stays attached, quiet, and inspectable."}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Ekiek travels with you.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              A small native sidecar follows the surface you are working in. It stays quiet until you ask, then brings only the relevant context.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Every file is first-class.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              No plugin hunt. Open normal files, ask real questions, and inspect source-backed answers.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, index) => (
              <div key={file} className={`min-h-[170px] rounded-[8px] border hairline p-4 ${index === 0 ? "paper" : "surface-2"}`}>
                <p className="text-sm font-semibold">{file}</p>
                <div className="mt-8 space-y-2">
                  <span className="block h-2 rounded bg-current opacity-20" />
                  <span className="block h-2 w-2/3 rounded bg-current opacity-20" />
                  <span className="block h-2 w-4/5 rounded bg-current opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="surface grid gap-6 p-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[8px] border border-[rgba(183,243,107,0.28)] bg-[rgba(183,243,107,0.06)] p-5">
            <h2 className="mb-4 text-3xl font-semibold">Context packets, not context dumps.</h2>
            <p className="text-base leading-7 text-[var(--paper-muted)]">
              Ekiek compiles the right files, ranges, symbols, memories, and permissions. The model does not get your whole life.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <PacketColumn title="Included" items={["Forecast!F12:F42", "Assumptions!B10:D18", "approved memory", "privacy.status"]} />
            <PacketColumn title="Excluded" items={["Client A notes", "hidden web instruction", "family memory", "full vault dump"]} muted />
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[rgba(255,255,255,0.018)] py-20">
        <div className="mx-auto grid max-w-[1300px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Local by default.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              No hosted memory. No cloud logs. No hidden profile. Cloud model delivery is opt-in and inspectable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["local kernel", "encrypted store", "local model router", "audit log"].map((item) => (
              <div key={item} className="surface-2 flex items-center gap-3 p-4">
                <ShieldCheck size={18} className="text-[var(--moss)]" />
                <span className="text-sm text-[var(--paper-muted)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tools.map((tool) => (
              <div key={tool} className="surface-2 p-4 text-center text-sm text-[var(--paper-muted)]">
                {tool}
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Works with your models and tools.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Connect Claude, Cursor, local models, browser, IDE, REST, and MCP through one permissioned local bridge.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-4 pb-24 pt-10 sm:px-6">
        <div className="overflow-hidden rounded-[14px] border hairline bg-[var(--paper)] p-6 text-[#15130f] sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 mono text-[11px]">
                <Lock size={13} />
                no account · choose folder · agent ready
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold sm:text-5xl">Build a private agent that actually remembers.</h2>
            </div>
            <Link
              href="/app"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#11150b] px-4 py-3 text-sm font-medium text-[var(--paper)] transition hover:bg-black active:translate-y-px"
            >
              Open the workspace
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}

function PacketColumn({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className="rounded-[8px] border hairline bg-black/15 p-4">
      <div className="mb-3 flex items-center gap-2">
        {muted ? <Network size={16} className="text-[var(--muted)]" /> : <CheckCircle2 size={16} className="text-[var(--moss)]" />}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className={`mono rounded-[6px] border hairline px-3 py-2 text-xs ${muted ? "text-[var(--muted)]" : "text-[var(--paper-muted)]"}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
