import { AgentOrb } from "./AgentOrb";

export function NativeDock({ surface }: { surface: string }) {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-20">
      <AgentOrb label={`Ekiek · ${surface}`} />
    </div>
  );
}
