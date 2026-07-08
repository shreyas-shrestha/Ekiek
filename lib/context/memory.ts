import type { ContextRequest, Memory } from "./types";
import { tokenize } from "./scoring";

export function selectMemories(request: ContextRequest, memories: Memory[]): Memory[] {
  const taskTokens = new Set(tokenize(request.task));

  return memories
    .filter((memory) => memory.approved)
    .filter((memory) => memory.scope === request.space || memory.scope === "Global")
    .filter((memory) => request.allowedSensitivity.includes(memory.sensitivity))
    .map((memory) => {
      const overlap = tokenize(memory.content).filter((token) => taskTokens.has(token)).length;
      return { memory, score: overlap * 10 + memory.confidence * 20 + (memory.scope === request.space ? 8 : 2) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ memory }) => memory);
}

export function proposeMemoryFromTask(task: string, evidenceSourceIds: string[]): Memory {
  return {
    id: `mem-proposed-${Math.abs(hash(task)).toString(36)}`,
    type: "fact",
    content: `Proposed memory from task: ${task}`,
    evidenceSourceIds,
    confidence: 0.64,
    scope: "Startup",
    sensitivity: "normal",
    allowedUses: ["context"],
    validFrom: "2026-07-08T00:00:00.000Z",
    approved: false
  };
}

function hash(value: string): number {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result << 5) - result + value.charCodeAt(index);
    result |= 0;
  }
  return result;
}
