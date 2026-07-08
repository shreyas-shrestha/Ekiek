import { Ban, CheckCircle2, TriangleAlert } from "lucide-react";
import type { PermissionDecision } from "@/lib/context/types";

const tone = {
  allowed: "text-[var(--moss)]",
  approval_required: "text-[var(--warning)]",
  blocked: "text-[var(--danger)]"
};

export function PermissionGate({ decision }: { decision: PermissionDecision }) {
  const Icon = decision.level === "allowed" ? CheckCircle2 : decision.level === "approval_required" ? TriangleAlert : Ban;

  return (
    <div className="surface-2 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-[var(--text)]">{decision.action}</span>
        <Icon size={16} className={tone[decision.level]} />
      </div>
      <p className="text-xs leading-relaxed text-[var(--muted)]">{decision.reason}</p>
    </div>
  );
}
