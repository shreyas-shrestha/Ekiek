import type { PrivacyMode } from "@/lib/context/types";

const modes: Array<{ id: PrivacyMode; label: string; detail: string }> = [
  { id: "fully_local", label: "Fully local", detail: "No packet leaves device." },
  { id: "ask_before_cloud", label: "Ask before cloud", detail: "Preview before send." },
  { id: "allow_selected_cloud", label: "Selected scopes", detail: "Limited opt-in." }
];

export function PrivacyModeSelector({ value, onChange }: { value: PrivacyMode; onChange: (value: PrivacyMode) => void }) {
  return (
    <div className="grid gap-2">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={`focus-ring rounded-[7px] border p-2 text-left transition ${
            value === mode.id ? "border-[rgba(183,243,107,0.45)] bg-[rgba(183,243,107,0.08)]" : "hairline hover:bg-white/5"
          }`}
        >
          <span className="block text-xs font-medium text-[var(--text)]">{mode.label}</span>
          <span className="mt-1 block text-[11px] text-[var(--muted)]">{mode.detail}</span>
        </button>
      ))}
    </div>
  );
}
