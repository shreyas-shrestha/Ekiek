import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { integrationTabs } from "@/lib/context/integrations";
import { CopyableSnippet } from "@/components/ui/CopyableSnippet";

type Integration = (typeof integrationTabs)[number];

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="surface p-4">
        <p className="mono mb-3 text-[11px] text-[var(--moss)]">{integration.label}</p>
        <h2 className="text-2xl font-semibold">{integration.description}</h2>
        <div className="mt-5 space-y-3">
          <InfoLine label="Can access" value={integration.access} icon={CheckCircle2} />
          <InfoLine label="Requires approval" value={integration.approval} icon={ShieldCheck} />
        </div>
      </div>
      <CopyableSnippet code={integration.snippet} label={`${integration.label} snippet`} />
    </div>
  );
}

function InfoLine({ label, value, icon: Icon }: { label: string; value: string; icon: typeof CheckCircle2 }) {
  return (
    <div className="rounded-[8px] border hairline bg-black/10 p-3">
      <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text)]">
        <Icon size={15} className="text-[var(--moss)]" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{value}</p>
    </div>
  );
}
