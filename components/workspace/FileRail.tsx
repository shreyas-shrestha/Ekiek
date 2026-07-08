import { CalendarDays, Code2, FileText, Globe2, Mail, Sheet, Workflow } from "lucide-react";
import { fileItems } from "@/lib/context/mock-data";
import type { ActiveSurface } from "@/lib/context/types";

const icons: Record<ActiveSurface, typeof FileText> = {
  workspace: FileText,
  spreadsheet: Sheet,
  pdf: FileText,
  codebase: Code2,
  browser: Globe2,
  email: Mail,
  calendar: CalendarDays,
  claude: Workflow,
  cursor: Code2
};

export function FileRail({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {fileItems.map((item) => {
        const Icon = icons[item.surface as ActiveSurface];
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`focus-ring flex w-full min-w-0 items-center gap-2 rounded-[6px] px-2 py-2 text-left text-sm transition ${
              activeId === item.id
                ? "bg-white/[0.08] text-[var(--text)]"
                : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
