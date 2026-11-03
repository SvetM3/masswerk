import React from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "de", label: "DE" },
  { id: "en", label: "EN" },
];

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("Sprache")}
      className="flex h-9 items-center rounded-full border border-border bg-card p-0.5"
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLang(option.id)}
            aria-pressed={isActive}
            title={option.id === "de" ? "Deutsch" : "English"}
            className={cn(
              "flex h-8 min-w-[30px] items-center justify-center rounded-full px-2 text-[11px] font-semibold tracking-[0.06em] transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}