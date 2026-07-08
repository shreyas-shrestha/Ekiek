import type { ContextPacket, ContextRequest, ContextSource, Memory } from "./types";
import { dataWouldLeaveDevice, packetWarnings, actionDecisions, canUseSensitivity, isCloudLikeTarget } from "./permissions";
import { exclusionReason, inclusionReason, scoreSource } from "./scoring";
import { selectMemories } from "./memory";

const MIN_INCLUDE_SCORE = 18;

export function compileContextPacket(
  request: ContextRequest,
  sources: ContextSource[],
  memories: Memory[]
): ContextPacket {
  const warnings = packetWarnings(request);
  const dataLeavesDevice = dataWouldLeaveDevice(request);
  const included: ContextPacket["included"] = [];
  const excluded: ContextPacket["excluded"] = [];
  let tokenEstimate = 0;

  const scored = sources
    .map((source) => scoreSource(source, request))
    .sort((a, b) => b.score - a.score || a.source.id.localeCompare(b.source.id));

  for (const candidate of scored) {
    const { source } = candidate;
    const wrongSpace = source.space !== request.space && source.space !== "Global";
    const sensitivityBlocked = !canUseSensitivity(request, source.sensitivity);
    const fullyLocalExternal = request.privacyMode === "fully_local" && isCloudLikeTarget(request.modelTarget);
    const cloudSensitiveBlocked =
      dataLeavesDevice && sensitivityBlocked && ["financial", "private", "credential", "client_confidential"].includes(source.sensitivity);
    const overBudget = tokenEstimate + source.tokenEstimate > request.maxTokens;
    const lowScore = candidate.score < MIN_INCLUDE_SCORE;

    if (wrongSpace) {
      excluded.push({
        source,
        score: candidate.score,
        reason: exclusionReason(candidate, `Excluded because it belongs to ${source.space}, not ${request.space}.`)
      });
      continue;
    }

    if (fullyLocalExternal && source.sensitivity !== "public" && source.kind !== "integration") {
      excluded.push({
        source,
        score: candidate.score,
        reason: exclusionReason(candidate, "Excluded from external delivery because fully local mode is active.")
      });
      continue;
    }

    if (cloudSensitiveBlocked || sensitivityBlocked) {
      excluded.push({
        source,
        score: candidate.score,
        reason: exclusionReason(candidate, `Excluded because ${source.sensitivity} sensitivity is not allowed for this request.`)
      });
      continue;
    }

    if (lowScore) {
      excluded.push({ source, score: candidate.score, reason: exclusionReason(candidate) });
      continue;
    }

    if (overBudget) {
      excluded.push({
        source,
        score: candidate.score,
        reason: exclusionReason(candidate, `Excluded because it would exceed the ${request.maxTokens} token packet budget.`)
      });
      continue;
    }

    included.push({ source, score: candidate.score, reason: inclusionReason(candidate) });
    tokenEstimate += source.tokenEstimate;
  }

  if (included.some((item) => item.source.tags.includes("untrusted_web"))) {
    warnings.push("One included source is untrusted web data; hidden or adversarial text is cited but not followed.");
  }

  const selectedMemories = selectMemories(request, memories);
  const memoryTokens = selectedMemories.length * 80;
  const permitted = actionDecisions({ dataLeavesDevice }, request);

  return {
    id: `packet-${stablePacketId(request.task, request.activeItemId ?? request.activeSurface, tokenEstimate)}`,
    task: request.task,
    summary: summarize(request, included, selectedMemories),
    included,
    excluded,
    memories: selectedMemories,
    warnings,
    permittedActions: permitted.filter((item) => item.level !== "blocked").map((item) => item.action),
    blockedActions: permitted.filter((item) => item.level === "blocked").map((item) => item.action),
    tokenEstimate: tokenEstimate + memoryTokens,
    dataLeavesDevice
  };
}

function summarize(
  request: ContextRequest,
  included: ContextPacket["included"],
  memories: Memory[]
): string {
  const sourceTitles = included.slice(0, 3).map((item) => item.source.title);
  const suffix = memories.length > 0 ? ` and ${memories.length} approved memor${memories.length === 1 ? "y" : "ies"}` : "";
  return `Compiled ${included.length} source${included.length === 1 ? "" : "s"} for ${request.activeSurface}: ${sourceTitles.join(", ")}${suffix}.`;
}

function stablePacketId(...parts: Array<string | number>): string {
  const value = parts.join("|");
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}
