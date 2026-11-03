import React from "react";
import { cn } from "@/lib/utils";

export default function ToolCard({ title, hint, children, className }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(20,18,16,0.04)] sm:p-6",
        className
      )}
    >
      {(title || hint) && (
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {hint ? (
            <span className="shrink-0 text-[11px] text-muted-foreground">{hint}</span>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}