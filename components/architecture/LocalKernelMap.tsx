import { Archive, Blocks, Bot, Database, FileSearch, Fingerprint, Globe2, HardDrive, Lock, Network, Router, ScrollText, ShieldCheck, Workflow } from "lucide-react";
import { ArchitectureNode } from "./ArchitectureNode";

const surfaces = [
  ["Desktop app", "Native workspace and sidecar.", HardDrive],
  ["Browser extension", "Selected page context only.", Globe2],
  ["IDE extension", "Repo symbols and tasks.", Blocks],
  ["MCP clients", "Claude, Cursor, ChatGPT-style tools.", Network],
  ["CLI/API", "Local automation entry points.", Workflow],
  ["Local runtimes", "Ollama, LM Studio, MLX.", Router]
] as const;

const kernel = [
  ["Document Engine", "Parses files, sheets, PDFs, and browser captures.", FileSearch],
  ["Memory Engine", "Proposes visible, approved memories.", Fingerprint],
  ["Context Compiler", "Builds minimal cited packets.", Archive],
  ["Permission Broker", "Blocks or gates sensitive actions.", ShieldCheck],
  ["Agent Runtime", "Ask, act, remember, automate.", Bot],
  ["Model Router", "Local first, external only by consent.", Router],
  ["Audit Log", "Records packet, action, and memory events.", ScrollText]
] as const;

const storage = [
  ["Filesystem", "Raw sources remain in place.", HardDrive],
  ["SQLite / SQLCipher", "Future encrypted local store.", Database],
  ["FTS index", "Fast local search.", FileSearch],
  ["Vector index future", "Optional local embeddings.", Archive],
  ["Memory graph", "Inspectable user-controlled graph.", Fingerprint],
  ["Packet history", "Every model-visible packet.", ScrollText]
] as const;

export function LocalKernelMap() {
  return (
    <div className="surface overflow-hidden p-4">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
        <Column title="Surfaces" items={surfaces} />
        <div>
          <div className="mb-3 rounded-[8px] border border-[rgba(183,243,107,0.28)] bg-[rgba(183,243,107,0.08)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lock size={18} className="text-[var(--moss)]" />
              <h2 className="text-lg font-semibold">Local Kernel</h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--paper-muted)]">
              Ekiek sits between files, apps, and AI tools. It parses documents, builds memory, compiles packets, enforces permissions, and logs what happened.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {kernel.map(([title, detail, Icon], index) => (
              <ArchitectureNode key={title} title={title} detail={detail} icon={Icon} tone={index < 4 ? "accent" : "normal"} />
            ))}
          </div>
        </div>
        <Column title="Local Storage" items={storage} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {["raw sources stay local", "packets are minimal", "cloud calls require consent", "website content is untrusted", "sensitive actions need approval"].map((rule) => (
          <div key={rule} className="rounded-[8px] border hairline bg-black/15 p-3 text-sm text-[var(--paper-muted)]">
            {rule}
          </div>
        ))}
      </div>
    </div>
  );
}

function Column({ title, items }: { title: string; items: readonly (readonly [string, string, typeof HardDrive])[] }) {
  return (
    <div>
      <h2 className="mono mb-3 text-[11px] text-[var(--muted)]">{title}</h2>
      <div className="grid gap-3">
        {items.map(([itemTitle, detail, Icon]) => (
          <ArchitectureNode key={itemTitle} title={itemTitle} detail={detail} icon={Icon} />
        ))}
      </div>
    </div>
  );
}
