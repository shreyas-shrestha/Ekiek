export type IntegrationTab =
  | "mcp"
  | "cursor"
  | "browser"
  | "models"
  | "rest"
  | "cli"
  | "proxy"
  | "obsidian"
  | "codebase"
  | "gmail";

export const integrationTabs: Array<{
  id: IntegrationTab;
  label: string;
  description: string;
  access: string;
  approval: string;
  snippet: string;
}> = [
  {
    id: "mcp",
    label: "Claude / MCP",
    description: "Claude, Cursor, ChatGPT-style clients, and other MCP clients can ask Ekiek for a context packet.",
    access: "context.packet, context.search, memory.search, memory.propose, privacy.status",
    approval: "Cloud or external model delivery previews included sources before send.",
    snippet: `{
  "mcpServers": {
    "ekiek": {
      "command": "ekiek",
      "args": ["serve-mcp"],
      "env": {
        "EKIEK_MODE": "local"
      }
    }
  }
}`
  },
  {
    id: "cursor",
    label: "Cursor / VS Code",
    description: "Attach a packet to a repo task without dumping the full project or unrelated spaces.",
    access: "codebase.context, document.search, action.propose",
    approval: "Sensitive files and production actions require approval.",
    snippet: `ekiek packet "fix auth redirect bug" --repo .
ekiek context inspect --last`
  },
  {
    id: "browser",
    label: "Browser Extension",
    description: "A small docked sidecar captures selected page context through the local bridge.",
    access: "Page title, selected text, saved captures, visible citations",
    approval: "Webpage content is untrusted data and is never treated as instructions.",
    snippet: `chrome.runtime.sendMessage({
  type: "EKIEK_CAPTURE_SELECTION",
  bridge: "http://localhost:47321/browser/capture"
});`
  },
  {
    id: "models",
    label: "Local Models",
    description: "Route packets to local runtimes before considering external models.",
    access: "Ollama, LM Studio, llama.cpp, MLX",
    approval: "Cloud keys are disabled by default and require per-space consent.",
    snippet: `adapters:
  ollama:
    endpoint: http://localhost:11434
  lmStudio:
    endpoint: http://localhost:1234/v1
  mlx:
    mode: local-accelerated`
  },
  {
    id: "rest",
    label: "REST API",
    description: "A local API for tools that do not speak MCP.",
    access: "context packets, memory search, action proposals, document search",
    approval: "POST requests that mutate state return proposed actions first.",
    snippet: `curl -X POST http://localhost:47321/context/packet \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "Draft a follow-up to Alex about pricing",
    "activeSurface": "email",
    "space": "Startup",
    "maxTokens": 2400,
    "modelTarget": "claude",
    "privacyMode": "ask_before_cloud"
  }'`
  },
  {
    id: "cli",
    label: "CLI",
    description: "Inspect, index, and serve your local context from a terminal.",
    access: "local filesystem, packet history, privacy status",
    approval: "CLI actions follow the same permission broker.",
    snippet: `ekiek index ~/Workspace
ekiek ask "what context matters for this meeting?"
ekiek packet "fix auth redirect bug" --repo .
ekiek serve-mcp
ekiek privacy status
ekiek memory inbox
ekiek context inspect --last`
  },
  {
    id: "proxy",
    label: "OpenAI-compatible Proxy",
    description: "Point compatible clients at a local model router with packet inspection.",
    access: "model routing, packet preview, audit log",
    approval: "External routing is off until the user approves destination and packet.",
    snippet: `EKIEK_MODE=local ekiek serve-proxy --port 47322
OPENAI_BASE_URL=http://localhost:47322/v1`
  },
  {
    id: "obsidian",
    label: "Obsidian Import",
    description: "Import or watch an existing vault while normal files remain first-class.",
    access: "Markdown, links, tags, attachments",
    approval: "Existing files stay where they are. Ekiek stores only local indexes.",
    snippet: `ekiek import obsidian ~/Notes/Vault --watch`
  },
  {
    id: "codebase",
    label: "Codebase Indexing",
    description: "Parse symbols, tests, package scripts, and conventions for repo-aware packets.",
    access: "tree, symbols, test commands, recent changes",
    approval: "Secrets and credentials are blocked from model packets.",
    snippet: `ekiek index-codebase .
ekiek packet "plan auth redirect fix" --include tests`
  },
  {
    id: "gmail",
    label: "Gmail / Calendar Future",
    description: "Future local connectors prepare briefings and draft follow-ups with approval.",
    access: "threads, events, commitments, related docs",
    approval: "Sending mail or creating events always requires approval.",
    snippet: `ekiek connectors enable gmail --mode draft-only
ekiek connectors enable calendar --mode observe`
  }
];
