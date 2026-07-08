"use client";

import { useEffect, useMemo, useState } from "react";
import { Command, Inbox, Lock, Search } from "lucide-react";
import { AgentSidecar } from "@/components/agent/AgentSidecar";
import { ContextPacketInspector } from "@/components/context/ContextPacketInspector";
import { ContextTray } from "@/components/context/ContextTray";
import { MemoryInbox } from "@/components/memory/MemoryInbox";
import { compileContextPacket } from "@/lib/context/compiler";
import { memories as seedMemories, sources } from "@/lib/context/mock-data";
import type { ActiveSurface, ContextRequest, Memory, ModelTarget, PrivacyMode, Sensitivity } from "@/lib/context/types";
import { CommandPaletteMock } from "./CommandPaletteMock";
import { FileRail } from "./FileRail";
import { ModelRouterPanel } from "./ModelRouterPanel";
import { PrivacyModeSelector } from "./PrivacyModeSelector";
import { SpaceSwitcher } from "./SpaceSwitcher";
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
  const [privacyMode, setPrivacyMode] = useState<PrivacyMode>("fully_local");
  const [modelTarget, setModelTarget] = useState<ModelTarget>("local");
  const [memoryState, setMemoryState] = useState<Memory[]>(seedMemories);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

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
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function compile() {
    setPacket(compileContextPacket(request, sources, memoryState));
  }

  function approveMemory(id: string) {
    setMemoryState((items) => items.map((memory) => (memory.id === id ? { ...memory, approved: true } : memory)));
  }

  function rejectMemory(id: string) {
    setMemoryState((items) => items.filter((memory) => memory.id !== id));
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1500px] flex-col gap-3 p-3 sm:p-4">
      <div className="surface flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-[7px] border hairline bg-[var(--panel-2)]">
            <Lock size={16} className="text-[var(--moss)]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Ekiek local workspace</p>
            <p className="truncate text-xs text-[var(--muted)]">{request.task}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-[7px] border hairline px-3 text-sm text-[var(--paper-muted)] transition hover:bg-white/5 active:translate-y-px"
          >
            <Search size={15} />
            <span>Command</span>
            <span className="mono rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">Cmd K</span>
          </button>
          <button
            type="button"
            onClick={() => setMemoryOpen(true)}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-[7px] border hairline px-3 text-sm text-[var(--paper-muted)] transition hover:bg-white/5 active:translate-y-px"
          >
            <Inbox size={15} />
            Memory inbox
          </button>
          <button
            type="button"
            onClick={compile}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-[7px] bg-[var(--paper)] px-3 text-sm font-medium text-[#15130f] transition hover:bg-white active:translate-y-px"
          >
            <Command size={15} />
            Compile
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-3 lg:grid-cols-[260px_minmax(0,1fr)_360px]">
        <aside className="surface flex flex-col gap-4 p-3">
          <div>
            <p className="mono mb-2 text-[10px] text-[var(--muted)]">Spaces</p>
            <SpaceSwitcher active={space} onChange={setSpace} />
          </div>
          <div className="min-h-0 flex-1">
            <p className="mono mb-2 text-[10px] text-[var(--muted)]">Files and surfaces</p>
            <FileRail activeId={activeId} onSelect={setActiveId} />
          </div>
          <div className="space-y-4 border-t hairline pt-3">
            <ModelRouterPanel value={modelTarget} onChange={setModelTarget} />
            <PrivacyModeSelector value={privacyMode} onChange={setPrivacyMode} />
          </div>
        </aside>

        <section className="surface min-h-[660px] overflow-hidden">
          <UniversalViewer source={activeSource} />
        </section>

        <AgentSidecar
          surface={activeSurface}
          packet={packet}
          request={request}
          onCompile={compile}
          onInspect={() => setInspectorOpen(true)}
          onOpenMemory={() => setMemoryOpen(true)}
        />
      </div>

      <ContextTray packet={packet} maxTokens={maxTokens} onInspect={() => setInspectorOpen(true)} />

      <ContextPacketInspector open={inspectorOpen} packet={packet} request={request} onClose={() => setInspectorOpen(false)} />
      <MemoryInbox
        open={memoryOpen}
        memories={memoryState}
        onClose={() => setMemoryOpen(false)}
        onApprove={approveMemory}
        onReject={rejectMemory}
      />
      <CommandPaletteMock open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
