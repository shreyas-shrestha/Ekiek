import { spaces } from "@/lib/context/mock-data";

export function SpaceSwitcher({ active, onChange }: { active: string; onChange: (space: string) => void }) {
  return (
    <div className="grid gap-1">
      {spaces.map((space) => (
        <button
          key={space}
          type="button"
          onClick={() => onChange(space)}
          className={`focus-ring rounded-[6px] px-2 py-1.5 text-left text-sm transition ${
            active === space ? "bg-[var(--paper)] text-[#15130f]" : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
          }`}
        >
          {space}
        </button>
      ))}
    </div>
  );
}
