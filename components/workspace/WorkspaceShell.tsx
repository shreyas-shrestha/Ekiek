"use client";

import { useEffect, useMemo, useState } from "react";
import { AgentPill, AgentSidecar } from "@/components/agent/AgentSidecar";
import { ContextPacketInspector } from "@/components/context/ContextPacketInspector";
import { ContextPill } from "@/components/context/ContextTray";
import { MemoryInbox } from "@/components/memory/MemoryInbox";
import { compileContextPacket } from "@/lib/context/compiler";
import { memories as seedMemories, sources } from "@/lib/context/mock-data";
import type { ActiveSurface, ContextRequest, Memory, ModelTarget, PrivacyMode, Sensitivity } from "@/lib/context/types";
import { CommandPaletteMock } from "./CommandPaletteMock";
import { SlimRail } from "./FileRail";
import { UniversalViewer } from "./viewers";

const maxTokens = 2200;

function taskForSurface(surface: ActiveSurface): string {
  const tasks: Record<ActiveSurface, string> = {
    workspace: "Summarize the local-first positioning and product principles",
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
  const [activeId, setActiveId] = useState("financial-model-forecast");
  const [privacyMode] = useState<PrivacyMode>("fully_local");
  const [modelTarget] = useState<ModelTarget>("local");
  const [memoryState, setMemoryState] = useState<Memory[]>(seedMemories);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  const activeSource = sources.find((source) => source.id === activeId) ?? sources[0];
  const activeSurface = (activeSource.surface ?? "workspace") as ActiveSurface;

  const request: ContextRequest = useMemo(
    () => ({
      task: taskForSurface(activeSurface),
      activeSurface,
      activeItemId: activeId,
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
      <SlimRail activeId={activeId} activeSpace={space} onSelect={selectFile} onSpaceChange={setSpace} onCommand={() => setPaletteOpen(true)} />

      <section className="relative flex min-w-0 flex-1 flex-col p-4 md:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm text-[var(--muted)]">{space} / {activeSurface}</p>
            <h1 className="truncate text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">{activeSource.title}</h1>
          </div>
          <ContextPill packet={packet} onInspect={() => setInspectorOpen(true)} />
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_90px_rgba(58,49,35,0.12)]">
          <UniversalViewer source={activeSource} />
          <div className="absolute right-5 top-24">
            <AgentPill surface={activeSurface} packet={packet} onOpen={() => setAgentOpen(true)} />
          </div>
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
