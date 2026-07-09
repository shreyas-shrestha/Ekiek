import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TravelSurfaceDemo } from "@/components/landing/TravelSurfaceDemo";
import { PageChrome } from "@/components/ui/PageChrome";

export default function LandingPage() {
  return (
    <PageChrome>
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1380px] gap-10 px-5 pb-16 pt-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm text-[var(--muted)]">Pick a folder. Ask one agent. Inspect every source.</p>
          <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Start a personal agent with your context.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Ekiek connects your files, notes, browser pages, email, calendar, and code locally, then gives you one place to ask about all of it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="focus-ring inline-flex items-center gap-2 rounded-[12px] bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--canvas)] transition hover:bg-black active:translate-y-px"
            >
              Open agent
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/setup"
              className="focus-ring inline-flex items-center rounded-[12px] border border-[var(--line)] bg-[rgba(255,255,255,0.55)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white active:translate-y-px"
            >
              Connect context
            </Link>
          </div>
          <p className="mt-5 text-sm text-[var(--muted)]">Local-first. Source-backed. Yours to inspect.</p>
        </div>
        <TravelSurfaceDemo />
      </section>

      <section id="how" className="mx-auto max-w-[1180px] px-5 py-12 lg:px-8">
        <div className="space-y-20">
          <Moment
            title="Connect your world."
            copy="Folders, notes, email, calendar, browser captures, spreadsheets, PDFs, and code become available to your private agent."
            visual={<FileMoment />}
          />
          <Moment
            title="Ask once."
            copy="Stop starting from a blank chat. Ekiek begins with the context you already have and keeps the answer grounded."
            visual={<AskMoment />}
            reverse
          />
          <Moment
            title="See every source."
            copy="Each answer shows what was included, what was excluded, and whether anything left your device."
            visual={<ContextMoment />}
          />
          <Moment
            title="Use it anywhere."
            copy="Send inspected context packets to Claude, Cursor, ChatGPT-style clients, local models, MCP, or a local API."
            visual={<NativeMoment />}
            reverse
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-10 lg:px-8">
        <div className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] px-6 py-5 text-center text-lg text-[var(--ink)] shadow-[0_16px_50px_rgba(58,49,35,0.08)]">
          Local by default. No hosted memory. No cloud logs. Cloud models require approval.
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
        <div className="rounded-[32px] bg-[var(--sidebar)] p-8 text-[var(--canvas)] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-4 text-sm text-[rgba(247,244,238,0.62)]">Start with your context.</p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Ask your personal agent today.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/app"
                className="focus-ring inline-flex items-center rounded-[12px] bg-[var(--canvas)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white active:translate-y-px"
              >
                Open agent
              </Link>
              <Link
                href="/setup"
                className="focus-ring inline-flex items-center rounded-[12px] border border-[rgba(247,244,238,0.22)] px-5 py-3 text-sm font-medium text-[var(--canvas)] transition hover:bg-white/10 active:translate-y-px"
              >
                Connect context
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}

function Moment({
  title,
  copy,
  visual,
  reverse = false
}: {
  title: string;
  copy: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <article className={`grid min-w-0 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="min-w-0">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-lg text-lg leading-8 text-[var(--muted)]">{copy}</p>
      </div>
      <div className="min-w-0">{visual}</div>
    </article>
  );
}

function FileMoment() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
      <div className="mb-5 flex flex-wrap gap-2">
        {["Spreadsheet", "PDF", "Note", "Code"].map((item, index) => (
          <span key={item} className={`rounded-full px-3 py-1.5 text-sm ${index === 0 ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--canvas-2)] text-[var(--muted)]"}`}>
            {item}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 overflow-hidden rounded-[18px] border border-[var(--line)] text-sm">
        {["Metric", "Jul", "Aug", "Q3", "Revenue", "$118k", "$139k", "$421k", "Conversion", "4.2%", "4.7%", "4.7%"].map((cell, index) => (
          <div key={`${cell}-${index}`} className={`border-b border-r border-[var(--line)] px-4 py-4 last:border-r-0 ${index > 3 && index < 8 ? "bg-[rgba(143,209,79,0.1)]" : ""}`}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

function AskMoment() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
      <div className="relative min-h-[250px] rounded-[22px] bg-[var(--canvas-2)] p-8">
        <div className="max-w-md rounded-[18px] bg-white p-5 text-[var(--ink)] shadow-sm">
          <p className="text-sm text-[var(--muted)]">contract.pdf</p>
          <h3 className="mt-8 text-2xl font-semibold">Renewal notice is due 30 days before September 30.</h3>
        </div>
        <div className="absolute right-8 top-24 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium shadow-[0_12px_34px_rgba(58,49,35,0.12)]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--moss)]" />
          Ekiek · Ask about this
        </div>
      </div>
    </div>
  );
}

function ContextMoment() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium text-[var(--ink)]">Included</p>
          {["Forecast!F12:F42", "Pricing note", "Approved writing preference"].map((item) => (
            <p key={item} className="mb-2 rounded-[14px] bg-[rgba(143,209,79,0.12)] px-4 py-3 text-sm text-[var(--ink)]">
              {item}
            </p>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-[var(--ink)]">Excluded</p>
          {["Client A", "private family memory", "hidden page instruction"].map((item) => (
            <p key={item} className="mb-2 rounded-[14px] bg-[var(--canvas-2)] px-4 py-3 text-sm text-[var(--muted)]">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function NativeMoment() {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-3">
      {["Browser", "Claude/Cursor", "Email"].map((surface) => (
        <div key={surface} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_18px_60px_rgba(58,49,35,0.08)]">
          <p className="mb-20 text-sm text-[var(--muted)]">{surface}</p>
          <span className="inline-flex rounded-full bg-[var(--canvas-2)] px-3 py-2 text-sm text-[var(--ink)]">
            Ekiek · local
          </span>
        </div>
      ))}
    </div>
  );
}
