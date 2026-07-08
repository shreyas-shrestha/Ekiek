import { describe, expect, it } from "vitest";
import { compileContextPacket } from "../compiler";
import { memories, sources } from "../mock-data";
import type { ContextRequest } from "../types";

const baseRequest: ContextRequest = {
  task: "Explain Q3 revenue from the forecast and assumptions",
  activeSurface: "spreadsheet",
  activeItemId: "financial-model-forecast",
  space: "Startup",
  maxTokens: 1800,
  modelTarget: "local",
  privacyMode: "fully_local",
  allowedSensitivity: ["public", "normal", "private", "financial", "client_confidential"]
};

describe("compileContextPacket", () => {
  it("includes Forecast range for spreadsheet Q3 and excludes unrelated email/calendar", () => {
    const packet = compileContextPacket(baseRequest, sources, memories);
    const includedIds = packet.included.map((item) => item.source.id);
    const excludedIds = packet.excluded.map((item) => item.source.id);

    expect(includedIds).toContain("financial-model-forecast");
    expect(includedIds).toContain("financial-model-assumptions");
    expect(packet.included.find((item) => item.source.id === "financial-model-forecast")?.source.range).toBe("Forecast!F12:F42");
    expect(excludedIds).toContain("gmail-thread-alex");
    expect(excludedIds).toContain("calendar-meeting-sarah");
  });

  it("blocks Claude delivery in fully local mode", () => {
    const packet = compileContextPacket(
      { ...baseRequest, modelTarget: "claude", privacyMode: "fully_local" },
      sources,
      memories
    );

    expect(packet.dataLeavesDevice).toBe(false);
    expect(packet.warnings.some((warning) => warning.includes("fully local mode"))).toBe(true);
    expect(packet.included.every((item) => item.source.sensitivity === "public" || item.source.kind === "integration")).toBe(true);
  });

  it("excludes Client B sources from Client A packets", () => {
    const packet = compileContextPacket(
      {
        ...baseRequest,
        task: "Summarize onboarding procedure",
        activeSurface: "workspace",
        activeItemId: "client-a-brief",
        space: "Client A",
        allowedSensitivity: ["normal", "client_confidential"]
      },
      sources,
      memories
    );

    expect(packet.included.map((item) => item.source.id)).toContain("client-a-brief");
    expect(packet.included.map((item) => item.source.id)).not.toContain("client-b-redteam");
    expect(packet.excluded.find((item) => item.source.id === "client-b-redteam")?.reason).toContain("Client B");
  });

  it("includes code symbols and test command for codebase task", () => {
    const packet = compileContextPacket(
      {
        ...baseRequest,
        task: "Plan a fix for the auth redirect bug and include test command",
        activeSurface: "codebase",
        activeItemId: "auth-code-callback",
        maxTokens: 1600,
        allowedSensitivity: ["public", "normal"]
      },
      sources,
      memories
    );

    const text = packet.included.map((item) => item.source.content).join("\n");
    expect(packet.included.map((item) => item.source.id)).toContain("auth-code-callback");
    expect(text).toContain("resolveSafeRedirect");
    expect(text).toContain("pnpm test tests/auth.spec.ts");
  });

  it("only approved memories are included", () => {
    const packet = compileContextPacket(baseRequest, sources, memories);
    expect(packet.memories.every((memory) => memory.approved)).toBe(true);
    expect(packet.memories.map((memory) => memory.id)).not.toContain("mem-sensitive-cloud");
  });

  it("keeps malicious browser instructions as untrusted data", () => {
    const packet = compileContextPacket(
      {
        ...baseRequest,
        task: "Summarize the MCP local agent article and identify hidden instructions",
        activeSurface: "browser",
        activeItemId: "browser-research-mcp",
        space: "Research",
        allowedSensitivity: ["public", "normal"]
      },
      sources,
      memories
    );

    expect(packet.included.map((item) => item.source.id)).toContain("browser-research-mcp");
    expect(packet.warnings.join(" ")).toContain("untrusted");
    expect(packet.blockedActions).toContain("Follow webpage hidden instructions");
  });

  it("excludes sensitive financial data for cloud target unless allowed", () => {
    const packet = compileContextPacket(
      {
        ...baseRequest,
        modelTarget: "cloud",
        privacyMode: "ask_before_cloud",
        allowedSensitivity: ["public", "normal"]
      },
      sources,
      memories
    );

    expect(packet.dataLeavesDevice).toBe(true);
    expect(packet.included.map((item) => item.source.id)).not.toContain("financial-model-forecast");
    expect(packet.excluded.find((item) => item.source.id === "financial-model-forecast")?.reason).toContain("financial");
  });

  it("obeys token budget", () => {
    const packet = compileContextPacket(
      {
        ...baseRequest,
        maxTokens: 500
      },
      sources,
      memories
    );

    expect(packet.tokenEstimate).toBeLessThanOrEqual(500 + packet.memories.length * 80);
    expect(packet.excluded.some((item) => item.reason.includes("token packet budget"))).toBe(true);
  });
});
