# Ekiek Prototype

Ekiek is a local-first personal agent workspace prototype built with Next.js, TypeScript, Tailwind CSS, Framer Motion, lucide-react, and Vitest.

## Run

```bash
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm lint
```

## Routes

- `/` landing page with live product shell and traveling agent demo.
- `/app` interactive workspace prototype.
- `/setup` local-first setup wizard.
- `/integrations` MCP/API/CLI/local model integration hub.
- `/architecture` local kernel architecture map.

## Kernel

The context compiler lives in `lib/context`. It scores sources, applies privacy and sensitivity rules, selects approved memories, obeys token budgets, and returns inspectable context packets with included and excluded sources.

## Extension

A minimal browser extension scaffold lives in `apps/extension`. It injects a small docked local sidecar and sends selected page context to the mock local bridge.
