# MCP Integration

Ekiek exposes a local MCP server so Claude, Cursor, ChatGPT-style clients, and other MCP clients can request scoped context packets.

```json
{
  "mcpServers": {
    "ekiek": {
      "command": "ekiek",
      "args": ["serve-mcp"],
      "env": {
        "EKIEK_MODE": "local"
      }
    }
  }
}
```

## Tools

- context.packet
- context.search
- memory.search
- memory.propose
- memory.approve
- document.search
- codebase.context
- action.propose
- action.approve
- privacy.status

Clients receive only compiled packets, never the full workspace.
