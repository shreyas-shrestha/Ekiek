"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Folder, HardDrive, Lock, Server } from "lucide-react";
import { useState } from "react";
import { MemoryCard } from "@/components/memory/MemoryCard";
import { memories as seedMemories } from "@/lib/context/mock-data";
import type { Memory } from "@/lib/context/types";

const steps = [
  "Welcome",
  "Folder",
  "Privacy",
  "Models",
  "Surfaces",
  "Memory map",
  "Finish"
];

export function SetupWizard() {
  const [step, setStep] = useState(0);
  const [privacy, setPrivacy] = useState("ask");
  const [memories, setMemories] = useState<Memory[]>(seedMemories);

  function next() {
    setStep((value) => Math.min(steps.length - 1, value + 1));
  }

  function back() {
    setStep((value) => Math.max(0, value - 1));
  }

  function approveMemory(id: string) {
    setMemories((items) => items.map((memory) => (memory.id === id ? { ...memory, approved: true } : memory)));
  }

  function rejectMemory(id: string) {
    setMemories((items) => items.filter((memory) => memory.id !== id));
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
      <div className="surface overflow-hidden">
        <div className="border-b hairline p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="mono text-[11px] text-[var(--moss)]">setup</p>
              <h1 className="mt-1 text-2xl font-semibold">Ekiek starts local.</h1>
            </div>
            <span className="mono rounded-full border hairline px-3 py-1 text-[11px] text-[var(--muted)]">
              {step + 1} / {steps.length}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`focus-ring h-2 rounded-full transition ${index <= step ? "bg-[var(--moss)]" : "bg-white/[0.08]"}`}
                aria-label={`Go to ${label}`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[560px] p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {step === 0 ? <WelcomeStep /> : null}
              {step === 1 ? <FolderStep /> : null}
              {step === 2 ? <PrivacyStep value={privacy} onChange={setPrivacy} /> : null}
              {step === 3 ? <ModelStep /> : null}
              {step === 4 ? <SurfaceStep /> : null}
              {step === 5 ? <MemoryStep memories={memories} onApprove={approveMemory} onReject={rejectMemory} /> : null}
              {step === 6 ? <FinishStep /> : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t hairline p-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="focus-ring inline-flex items-center gap-2 rounded-[7px] border hairline px-3 py-2 text-sm text-[var(--text)] transition hover:bg-white/5 active:translate-y-px"
          >
            <ChevronLeft size={15} />
            Back
          </button>
          <button
            type="button"
            onClick={next}
            className="focus-ring inline-flex items-center gap-2 rounded-[7px] bg-[var(--paper)] px-4 py-2 text-sm font-medium text-[#15130f] transition hover:bg-white active:translate-y-px"
          >
            {step === steps.length - 1 ? "Open workspace" : "Continue"}
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        <h2 className="text-4xl font-semibold tracking-normal">No account. No cloud memory.</h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)]">Choose a folder and Ekiek starts local. Indexing continues in the background while the agent becomes useful immediately.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {["choose folder", "local kernel", "agent ready"].map((item, index) => (
          <div key={item} className="surface-2 min-h-[180px] p-4">
            <span className="mono text-[10px] text-[var(--moss)]">0{index + 1}</span>
            <p className="mt-16 text-sm text-[var(--paper-muted)]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FolderStep() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="surface-2 p-4">
        <div className="mb-4 flex items-center gap-3">
          <Folder size={20} className="text-[var(--moss)]" />
          <div>
            <h2 className="text-xl font-semibold">Choose local folder</h2>
            <p className="text-sm text-[var(--muted)]">Existing files remain where they are.</p>
          </div>
        </div>
        <div className="rounded-[8px] border hairline bg-black/20 p-4 mono text-sm text-[var(--paper-muted)]">~/Workspace/Ekiek</div>
        <div className="mt-3 rounded-[8px] border hairline bg-black/20 p-4 mono text-sm text-[var(--paper-muted)]">~/Notes/Obsidian Vault</div>
      </div>
      <div className="surface-2 p-4">
        <p className="mb-3 text-sm font-medium">Progressive indexing</p>
        {["Markdown", "PDF", "XLSX", "Code", "Browser captures"].map((item, index) => (
          <div key={item} className="mb-3">
            <div className="mb-1 flex justify-between mono text-[10px] text-[var(--muted)]">
              <span>{item}</span>
              <span>{80 - index * 11}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-[var(--moss)]" style={{ width: `${80 - index * 11}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyStep({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const options = [
    ["local", "Fully local", "Local models only. Nothing leaves device."],
    ["ask", "Ask before cloud", "Preview packet before any external model sees it."],
    ["scopes", "Selected cloud scopes", "Allow specific spaces or sensitivities later."]
  ];
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Pick a privacy mode.</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {options.map(([id, label, detail]) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`focus-ring min-h-[220px] rounded-[8px] border p-4 text-left transition ${
              value === id ? "border-[rgba(183,243,107,0.45)] bg-[rgba(183,243,107,0.08)]" : "hairline bg-black/10 hover:bg-white/5"
            }`}
          >
            <Lock size={18} className="mb-16 text-[var(--moss)]" />
            <p className="text-lg font-semibold">{label}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModelStep() {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Detected local model runtimes.</h2>
      <div className="grid gap-3 md:grid-cols-4">
        {["Ollama", "LM Studio", "llama.cpp", "Apple MLX"].map((model, index) => (
          <div key={model} className="surface-2 min-h-[190px] p-4">
            <Server size={18} className={index < 2 ? "text-[var(--moss)]" : "text-[var(--muted)]"} />
            <p className="mt-16 text-lg font-semibold">{model}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{index < 2 ? "available" : "not detected"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SurfaceStep() {
  const surfaces = ["Browser", "IDE", "Claude/Cursor", "Gmail/Calendar", "Local files", "Codebases"];
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Enable surfaces.</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {surfaces.map((surface, index) => (
          <button
            key={surface}
            type="button"
            className="focus-ring surface-2 flex min-h-[150px] flex-col items-start justify-between p-4 text-left transition hover:bg-white/[0.06]"
          >
            <HardDrive size={18} className={index < 5 ? "text-[var(--moss)]" : "text-[var(--warning)]"} />
            <span className="text-lg font-semibold">{surface}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MemoryStep({ memories, onApprove, onReject }: { memories: Memory[]; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Initial memory map preview.</h2>
      <div className="grid gap-3 lg:grid-cols-2">
        {memories
          .filter((memory) => !memory.approved)
          .slice(0, 4)
          .map((memory) => (
            <MemoryCard key={memory.id} memory={memory} onApprove={onApprove} onReject={onReject} />
          ))}
      </div>
    </div>
  );
}

function FinishStep() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        <h2 className="text-4xl font-semibold">Agent ready.</h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)]">Indexing continues in the background. The workspace can answer with citations before model setup finishes.</p>
      </div>
      <div className="surface-2 p-5">
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle2 size={22} className="text-[var(--moss)]" />
          <p className="text-lg font-semibold">Local kernel running</p>
        </div>
        <div className="space-y-3">
          {["Document engine", "Memory engine", "Permission broker", "MCP bridge"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-[7px] border hairline px-3 py-2">
              <span className="text-sm text-[var(--paper-muted)]">{item}</span>
              <CheckCircle2 size={14} className="text-[var(--moss)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
