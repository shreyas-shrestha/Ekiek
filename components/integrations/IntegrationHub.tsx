"use client";

import { useState } from "react";
import { integrationTabs } from "@/lib/context/integrations";
import { IntegrationCard } from "./IntegrationCard";

export function IntegrationHub() {
  const [active, setActive] = useState(integrationTabs[0].id);
  const selected = integrationTabs.find((item) => item.id === active) ?? integrationTabs[0];

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <p className="mono mb-3 text-[11px] text-[var(--moss)]">local bridge</p>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">Connect once. Send only the packet.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          Claude, Cursor, browser, REST, CLI, and local models ask Ekiek for scoped context. They do not receive the whole workspace.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="surface p-2">
          {integrationTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`focus-ring mb-1 w-full rounded-[7px] px-3 py-2 text-left text-sm transition ${
                active === tab.id ? "bg-[var(--paper)] text-[#15130f]" : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>
        <IntegrationCard integration={selected} />
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {["No remote model calls in prototype", "Cloud access defaults to approval", "Sensitive memories stay blocked"].map((item) => (
          <div key={item} className="surface-2 p-4 text-sm text-[var(--paper-muted)]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
