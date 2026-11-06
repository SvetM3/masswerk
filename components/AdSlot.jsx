import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export default function AdSlot({ placement = "top" }) {
  const { t } = useI18n();
  const isTop = placement === "top";

  const publisherId = "ca-pub-8270844857037645";

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense execution error:", e);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 overflow-hidden",
          isTop ? "mt-3 min-h-[90px]" : "mb-4 min-h-[90px]"
        )}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client={publisherId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
