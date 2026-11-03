import React from "react";
import {
  ChefHat,
  Type,
  RectangleHorizontal,
  Percent,
  KeyRound,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const TABS = [
  { id: "kueche", label: "Küchen-Rechner", icon: ChefHat },
  { id: "rem", label: "Pixel in REM", icon: Type },
  { id: "format", label: "Seitenverhältnis", icon: RectangleHorizontal },
  { id: "prozent", label: "Prozent & MwSt.", icon: Percent },
  { id: "passwort", label: "Passwort-Generator", icon: KeyRound },
  { id: "text", label: "Wortzähler", icon: FileText },
];

export default function TabNav({ active, onChange }) {
  const { t } = useI18n();

  return (
    <div
      role="tablist"
      aria-label={t("Rechner auswählen")}
      className="grid grid-cols-3 gap-1 rounded-2xl border border-border bg-card p-1 shadow-[0_1px_2px_rgba(20,18,16,0.04)] sm:grid-cols-6"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${id}`}
            onClick={() => onChange(id)}
            className={cn(
              "flex min-h-[58px] flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 py-2 text-center text-[11px] font-medium leading-tight transition-all duration-200 sm:min-h-[62px] sm:text-[11.5px]",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2.4 : 2} />
            <span className="tracking-tight">{t(label)}</span>
          </button>
        );
      })}
    </div>
  );
}