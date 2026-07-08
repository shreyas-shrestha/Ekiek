import { Cpu, Database, Lock, Server } from "lucide-react";
import { LocalKernelMap } from "@/components/architecture/LocalKernelMap";
import { PageChrome } from "@/components/ui/PageChrome";

export default function ArchitecturePage() {
  return (
    <PageChrome>
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <div className="mb-8 max-w-4xl">
          <p className="mono mb-3 text-[11px] text-[var(--moss)]">architecture</p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-6xl">A local kernel between your work and your models.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
            Ekiek parses documents, builds memory, compiles context packets, enforces permissions, and logs what happened without storing user data on Ekiek servers.
          </p>
        </div>

        <LocalKernelMap />

        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          <ArchitectureRule icon={Lock} title="No hosted memory" detail="The prototype uses mock local data. Production storage is local and encrypted." />
          <ArchitectureRule icon={Cpu} title="Local model router" detail="Ollama, LM Studio, llama.cpp, and MLX can receive permitted packets." />
          <ArchitectureRule icon={Server} title="MCP and API adapters" detail="External clients request packets through a permissioned local bridge." />
          <ArchitectureRule icon={Database} title="Audit everything" detail="Every memory, packet, excluded source, warning, and action is inspectable." />
        </section>
      </div>
    </PageChrome>
  );
}

function ArchitectureRule({ icon: Icon, title, detail }: { icon: typeof Lock; title: string; detail: string }) {
  return (
    <div className="surface p-4">
      <Icon size={18} className="text-[var(--moss)]" />
      <h2 className="mt-10 text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{detail}</p>
    </div>
  );
}
