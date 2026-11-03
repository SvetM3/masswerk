import React from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export default function AdSlot({ placement = "top" }) {
  const { t } = useI18n();
  const isTop = placement === "top";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40",
          isTop ? "mt-3 h-14 sm:h-20" : "mb-4 h-20 sm:h-24"
        )}
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/70">
          {t("Werbung")}
        </span>
      </div>
    </div>
  );
}