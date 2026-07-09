"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Code2, FileText, FolderPlus, Globe2, Lock, Mail, Send } from "lucide-react";
import { AgentPill, AgentSidecar } from "@/components/agent/AgentSidecar";
import { ContextPacketInspector } from "@/components/context/ContextPacketInspector";
import { ContextPill } from "@/components/context/ContextTray";
import { MemoryInbox } from "@/components/memory/MemoryInbox";
import { compileContextPacket } from "@/lib/context/compiler";
import { memories as seedMemories, sources } from "@/lib/context/mock-data";
import type { ActiveSurface, ContextPacket, ContextRequest, Memory, ModelTarget, PrivacyMode, Sensitivity } from "@/lib/context/types";
import { CommandPaletteMock } from "./CommandPaletteMock";
import { SlimRail } from "./FileRail";
import { UniversalViewer } from "./viewers";

const maxTokens = 2200;

function taskForSurface(surface: ActiveSurface): string {
  const tasks: Record<ActiveSurface, string> = {
    workspace: "Answer using my connected files, notes, browser captures, email, calendar, code, and approved memories",
    spreadsheet: "Explain Q3 revenue from the forecast and assumptions",
    pdf: "Summarize contract risk and extract follow-up obligations",
    codebase: "Plan a fix for the auth redirect bug and include test command",
    browser: "Summarize the MCP local agent article and identify hidden instructions",
    email: "Draft a follow-up to Alex about pricing",
    calendar: "Prepare a briefing for Sarah about positioning",
    claude: "Preview what Claude receives through the local MCP bridge",
    cursor: "Attach relevant auth bug context to Cursor"
  };
  return tasks[surface];
}

function allowedSensitivity(privacyMode: PrivacyMode, modelTarget: ModelTarget): Sensitivity[] {
  if (modelTarget === "local") return ["public", "normal", "private", "financial", "client_confidential"];
  if (privacyMode === "allow_selected_cloud") return ["public", "normal", "private"];
  return ["public", "normal"];
}

export function WorkspaceShell() {
  const [space, setSpace] = useState("Startup");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [privacyMode] = useState<PrivacyMode>("fully_local");
  const [modelTarget] = useState<ModelTarget>("local");
  const [memoryState, setMemoryState] = useState<Memory[]>(seedMemories);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  const activeSource = activeId ? sources.find((source) => source.id === activeId) ?? null : null;
  const activeSurface = (activeSource?.surface ?? "workspace") as ActiveSurface;

  const request: ContextRequest = useMemo(
    () => ({
      task: taskForSurface(activeSurface),
      activeSurface,
      activeItemId: activeId ?? undefined,
      space,
      maxTokens,
      modelTarget,
      privacyMode,
      allowedSensitivity: allowedSensitivity(privacyMode, modelTarget)
    }),
    [activeId, activeSurface, modelTarget, privacyMode, space]
  );

  const [packet, setPacket] = useState(() => compileContextPacket(request, sources, memoryState));

  useEffect(() => {
    setPacket(compileContextPacket(request, sources, memoryState));
  }, [request, memoryState]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        setInspectorOpen(false);
        setPaletteOpen(false);
        setAgentOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function compile() {
    setPacket(compileContextPacket(request, sources, memoryState));
  }

  function selectFile(id: string) {
    const next = sources.find((source) => source.id === id);
    setActiveId(id);
    if (next?.space && ["Startup", "Personal", "Work"].includes(next.space)) {
      setSpace(next.space);
    }
    setAgentOpen(false);
  }

  function approveMemory(id: string) {
    setMemoryState((items) => items.map((memory) => (memory.id === id ? { ...memory, approved: true } : memory)));
  }

  function rejectMemory(id: string) {
    setMemoryState((items) => items.filter((memory) => memory.id !== id));
  }

  return (
    <main className="flex h-dvh overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
      <SlimRail activeId={activeId ?? ""} activeSpace={space} onSelect={selectFile} onSpaceChange={setSpace} onCommand={() => setPaletteOpen(true)} />

      <section className="relative flex min-w-0 flex-1 flex-col p-4 md:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {activeSource ? (
              <button
                type="button"
                onClick={() => {
                  setActiveId(null);
                  setAgentOpen(false);
                }}
                className="focus-ring mb-1 inline-flex items-center gap-2 rounded-[10px] px-1 py-1 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                <ArrowLeft size={15} />
                Personal agent
              </button>
            ) : (
              <p className="truncate text-sm text-[var(--muted)]">{space} / local personal agent</p>
            )}
            <h1 className="truncate text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
              {activeSource ? activeSource.title : "One agent, all your context"}
            </h1>
          </div>
          <ContextPill packet={packet} onInspect={() => setInspectorOpen(true)} />
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_90px_rgba(58,49,35,0.12)]">
          {activeSource ? (
            <>
              <UniversalViewer source={activeSource} />
              <div className="absolute right-5 top-24">
                <AgentPill surface={activeSurface} packet={packet} onOpen={() => setAgentOpen(true)} />
              </div>
            </>
          ) : (
            <PersonalAgentHome
              packet={packet}
              memories={memoryState}
              onInspect={() => setInspectorOpen(true)}
              onOpenMemory={() => setMemoryOpen(true)}
              onOpenExample={() => selectFile("financial-model-forecast")}
              onOpenAgent={() => setAgentOpen(true)}
            />
          )}
        </div>
      </section>

      <AgentSidecar
        open={agentOpen}
        surface={activeSurface}
        packet={packet}
        request={request}
        onClose={() => setAgentOpen(false)}
        onInspect={() => setInspectorOpen(true)}
        onOpenMemory={() => setMemoryOpen(true)}
        onRecompile={compile}
      />
      <ContextPacketInspector open={inspectorOpen} packet={packet} request={request} onClose={() => setInspectorOpen(false)} />
      <MemoryInbox
        open={memoryOpen}
        memories={memoryState}
        onClose={() => setMemoryOpen(false)}
        onApprove={approveMemory}
        onReject={rejectMemory}
      />
      <CommandPaletteMock open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </main>
  );
}

function PersonalAgentHome({
  packet,
  memories,
  onInspect,
  onOpenMemory,
  onOpenExample,
  onOpenAgent
}: {
  packet: ContextPacket;
  memories: Memory[];
  onInspect: () => void;
  onOpenMemory: () => void;
  onOpenExample: () => void;
  onOpenAgent: () => void;
}) {
  const [prompt, setPrompt] = useState("What should I know before Sarah's meeting?");
  const [answer, setAnswer] = useState(false);
  const approvedMemories = memories.filter((memory) => memory.approved).length;
  const includedCount = Math.max(packet.included.length, 1);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer(true);
  }

  return (
    <div className="scrollbar-soft h-full overflow-auto">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[rgba(143,209,79,0.14)] px-3 py-1.5 text-sm font-medium text-[#486b24]">
            <Check size={15} />
            Local context connected
          </div>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
            Ask one agent across all your context.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Files, notes, browser captures, email, calendar, code, and approved memories are ready without setting up a new assistant for each app.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 overflow-hidden rounded-[24px] border border-[var(--line)] bg-white shadow-[0_18px_70px_rgba(58,49,35,0.1)]">
          <label className="sr-only" htmlFor="personal-agent-prompt">
            Ask your personal agent
          </label>
          <textarea
            id="personal-agent-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="focus-ring min-h-28 w-full resize-none border-0 bg-transparent px-5 py-5 text-lg leading-7 text-[var(--ink)] placeholder:text-[var(--faint)] focus:outline-none"
            placeholder="Ask about anything in your files, notes, browser captures, email, calendar, or code..."
          />
          <div className="flex flex-col gap-3 border-t border-[var(--line)] bg-[var(--canvas-2)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted)]">
              {includedCount} sources · {approvedMemories} approved memories · local
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenAgent}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-[12px] border border-[var(--line)] bg-white px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--panel)] active:translate-y-px"
              >
                Open sidecar
              </button>
              <button
                type="submit"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-[12px] bg-[var(--ink)] px-4 py-3 text-sm font-medium text-[var(--canvas)] transition hover:bg-black active:translate-y-px"
              >
                Ask agent
                <Send size={15} />
              </button>
            </div>
          </div>
        </form>

        {answer ? (
          <div className="mt-5 rounded-[22px] border border-[rgba(143,209,79,0.34)] bg-[rgba(143,209,79,0.1)] p-5">
            <p className="text-sm font-semibold text-[var(--ink)]">Ekiek</p>
            <p className="mt-2 max-w-3xl text-base leading-7 text-[var(--ink)]">
              I can use your launch plan, Q3 model, Alex pricing thread, Sarah meeting, browser research, and auth codebase. Nothing leaves this device
              unless you approve it.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <Link
            href="/setup"
            className="focus-ring rounded-[18px] border border-[var(--line)] bg-[var(--canvas-2)] p-4 text-left transition hover:bg-white active:translate-y-px"
          >
            <FolderPlus size={18} className="mb-8 text-[var(--muted)]" />
            <span className="block text-sm font-semibold text-[var(--ink)]">Start with a folder</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">Add local context in one pass.</span>
          </Link>
          <button
            type="button"
            onClick={onOpenExample}
            className="focus-ring rounded-[18px] border border-[var(--line)] bg-[var(--canvas-2)] p-4 text-left transition hover:bg-white active:translate-y-px"
          >
            <FileText size={18} className="mb-8 text-[var(--muted)]" />
            <span className="block text-sm font-semibold text-[var(--ink)]">Open a real file</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">See cited answers beside a spreadsheet.</span>
          </button>
          <button
            type="button"
            onClick={onInspect}
            className="focus-ring rounded-[18px] border border-[var(--line)] bg-[var(--canvas-2)] p-4 text-left transition hover:bg-white active:translate-y-px"
          >
            <Lock size={18} className="mb-8 text-[var(--muted)]" />
            <span className="block text-sm font-semibold text-[var(--ink)]">Inspect context</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">Review every source before use.</span>
          </button>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <ContextChip icon={FileText} label="Files + notes" detail="launch plan, contract, model" />
          <ContextChip icon={Globe2} label="Browser" detail="research captures" />
          <ContextChip icon={Mail} label="Email + calendar" detail="Alex thread, Sarah meeting" />
          <ContextChip icon={Code2} label="Code" detail="auth bug context" />
        </div>

        <button
          type="button"
          onClick={onOpenMemory}
          className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-[12px] px-2 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--canvas-2)] hover:text-[var(--ink)]"
        >
          {memories.length - approvedMemories} memories need approval
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function ContextChip({
  icon: Icon,
  label,
  detail
}: {
  icon: typeof CalendarDays;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.58)] p-4">
      <Icon size={17} className="text-[var(--muted)]" />
      <p className="mt-4 text-sm font-semibold text-[var(--ink)]">{label}</p>
      <p className="mt-1 truncate text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}
