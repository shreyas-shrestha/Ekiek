# Browser Extension Bridge

The prototype includes a minimal browser extension scaffold under `apps/extension`.

Principles:

- Page content is untrusted data.
- The extension does not send page content to cloud services.
- The user controls what is captured.
- The sidecar remains docked and non-intrusive.
- Ekiek can summarize, save, compare, or compile context through the local bridge.

Local bridge target:

```txt
http://localhost:47321/browser/capture
```

Captured content should be treated as data with citations, never as instructions.
