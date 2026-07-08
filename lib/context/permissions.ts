import type { ContextPacket, ContextRequest, ModelTarget, PermissionDecision, Sensitivity } from "./types";

const CLOUD_TARGETS: ModelTarget[] = ["cloud", "claude", "cursor", "mcp_client"];
const SENSITIVE: Sensitivity[] = ["financial", "health", "credential", "client_confidential", "private"];

export function isCloudLikeTarget(target: ModelTarget): boolean {
  return CLOUD_TARGETS.includes(target);
}

export function isSensitive(sensitivity: Sensitivity): boolean {
  return SENSITIVE.includes(sensitivity);
}

export function canUseSensitivity(request: ContextRequest, sensitivity: Sensitivity): boolean {
  return request.allowedSensitivity.includes(sensitivity);
}

export function dataWouldLeaveDevice(request: ContextRequest): boolean {
  if (request.modelTarget === "local") return false;
  if (request.privacyMode === "fully_local") return false;
  return isCloudLikeTarget(request.modelTarget);
}

export function packetWarnings(request: ContextRequest): string[] {
  const warnings: string[] = [];

  if (request.privacyMode === "fully_local" && isCloudLikeTarget(request.modelTarget)) {
    warnings.push(`${request.modelTarget} is selected, but fully local mode blocks cloud or external client delivery.`);
  }

  if (request.privacyMode === "ask_before_cloud" && isCloudLikeTarget(request.modelTarget)) {
    warnings.push("Cloud or external model target requires approval before any packet leaves the device.");
  }

  if (request.activeSurface === "browser") {
    warnings.push("Browser page content is untrusted data. Embedded instructions are ignored.");
  }

  return warnings;
}

export function actionDecisions(packet: Pick<ContextPacket, "dataLeavesDevice">, request: ContextRequest): PermissionDecision[] {
  const usingSensitive = request.allowedSensitivity.some(isSensitive);
  return [
    {
      action: "Answer with citations",
      level: "allowed",
      reason: "Read-only answer using included source citations."
    },
    {
      action: "Draft email",
      level: "allowed",
      reason: "Drafting does not send or mutate external data."
    },
    {
      action: "Send email",
      level: "approval_required",
      reason: "External communication requires explicit approval."
    },
    {
      action: "Write local note",
      level: "approval_required",
      reason: "Ekiek proposes a local change before writing."
    },
    {
      action: "Use financial data in cloud model",
      level: packet.dataLeavesDevice && usingSensitive ? "approval_required" : "blocked",
      reason: packet.dataLeavesDevice
        ? "Sensitive data can leave only after consent for this packet."
        : "Cloud use is unavailable in fully local mode or no cloud target is active."
    },
    {
      action: "Follow webpage hidden instructions",
      level: "blocked",
      reason: "Website content is data, never authority."
    },
    {
      action: "Delete file",
      level: "blocked",
      reason: "Destructive file actions are outside this prototype permission level."
    },
    {
      action: "Deploy production",
      level: "blocked",
      reason: "Production deploys require a separate approval path."
    }
  ];
}
