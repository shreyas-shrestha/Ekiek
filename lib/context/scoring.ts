import type { ContextRequest, ContextSource, ScoredSource } from "./types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "this",
  "to",
  "what",
  "with"
]);

export function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_./:-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function overlap(a: string[], b: string[]): number {
  const bSet = new Set(b.map((value) => value.toLowerCase()));
  return [...new Set(a.map((value) => value.toLowerCase()))].filter((value) => bSet.has(value)).length;
}

function recencyScore(updatedAt: string): number {
  const now = new Date("2026-07-08T00:00:00.000Z").getTime();
  const updated = new Date(updatedAt).getTime();
  const days = Math.max(0, (now - updated) / 86_400_000);
  return Math.max(0, 10 - Math.min(10, days));
}

export function scoreSource(source: ContextSource, request: ContextRequest): ScoredSource {
  const taskTokens = tokenize(request.task);
  const sourceTokens = tokenize([source.title, source.content, source.path, source.range].filter(Boolean).join(" "));
  const tagScore = overlap(taskTokens, source.tags);
  const entityScore = overlap(taskTokens, source.entities);
  const keywordScore = overlap(taskTokens, sourceTokens);
  const signals: string[] = [];
  const penalties: string[] = [];
  let score = 0;

  if (keywordScore > 0) {
    score += keywordScore * 8;
    signals.push(`${keywordScore} task keyword match${keywordScore === 1 ? "" : "es"}`);
  }

  if (tagScore > 0) {
    score += tagScore * 12;
    signals.push(`${tagScore} tag match${tagScore === 1 ? "" : "es"}`);
  }

  if (entityScore > 0) {
    score += entityScore * 10;
    signals.push(`${entityScore} entity match${entityScore === 1 ? "" : "es"}`);
  }

  if (source.surface === request.activeSurface) {
    score += 26;
    signals.push("active surface");
  } else if ((source.kind === "email" || source.kind === "calendar") && source.id !== request.activeItemId) {
    score -= 45;
    penalties.push(`${source.kind} is not the active surface`);
  }

  if (source.id === request.activeItemId) {
    score += 36;
    signals.push("active item");
  }

  if (source.space === request.space) {
    score += 18;
    signals.push("same space");
  } else if (source.space === "Global") {
    score += 5;
    signals.push("global scope");
  } else {
    score -= 80;
    penalties.push(`different space: ${source.space}`);
  }

  const recency = recencyScore(source.updatedAt);
  if (recency > 0) {
    score += recency;
    signals.push("recent");
  }

  score += source.trust * 12;
  if (source.trust >= 0.8) {
    signals.push("high trust");
  } else if (source.trust < 0.55) {
    penalties.push("low trust / untrusted data");
  }

  if (!request.allowedSensitivity.includes(source.sensitivity)) {
    score -= 45;
    penalties.push(`sensitivity not allowed: ${source.sensitivity}`);
  }

  if (source.tags.includes("untrusted_web")) {
    score -= 10;
    penalties.push("webpage content is untrusted data");
  }

  return {
    source,
    score: Math.round(score),
    signals,
    penalties
  };
}

export function inclusionReason(scored: ScoredSource): string {
  const usefulSignals = scored.signals.slice(0, 4).join(", ");
  const caution = scored.penalties.length > 0 ? `; caution: ${scored.penalties[0]}` : "";
  return usefulSignals ? `Included because of ${usefulSignals}${caution}.` : "Included as a supporting source.";
}

export function exclusionReason(scored: ScoredSource, explicit?: string): string {
  if (explicit) return explicit;
  if (scored.penalties.length > 0) return `Excluded because ${scored.penalties.join(", ")}.`;
  if (scored.score <= 0) return "Excluded because it did not match the task or active surface.";
  return "Excluded to keep the packet small and task-specific.";
}
