# Ekiek Architecture

Ekiek is a local-first personal agent workspace. The product center is the workspace and traveling sidecar; memory is an internal kernel, not the product surface.

## Local Flow

1. Surfaces expose local context: files, spreadsheets, PDFs, codebases, browser captures, email, calendar, CLI, and MCP clients.
2. The local kernel parses documents, proposes memory, scores relevance, and compiles context packets.
3. The permission broker removes disallowed sources, marks warnings, and gates actions.
4. Local models receive permitted packets directly. Cloud or external clients require a preview and approval.
5. The audit log stores what was included, excluded, and approved.

## Kernel Modules

- Document Engine: parses normal files without a plugin hunt.
- Memory Engine: proposes visible memories with source evidence.
- Context Compiler: creates minimal source-backed packets.
- Permission Broker: enforces local-first privacy and action approvals.
- Agent Runtime: ask, act, remember, automate.
- Model Router: local-first routing to Ollama, LM Studio, llama.cpp, MLX, or approved cloud targets.
- Audit Log: packet history, memory decisions, action proposals.

No prototype code calls a remote API or requires cloud credentials.
