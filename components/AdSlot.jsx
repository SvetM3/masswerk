import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useARG } from "@/lib/ARGContext";

export default function AdSlot({ placement = "bottom", slotId = "" }) {
  const isTop = placement === "top";
  const insRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const { isUnlocked } = useARG();

  const publisherId = "ca-pub-8270844857037645";

  useEffect(() => {
    if (isUnlocked || !slotId) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignore duplicate push errors in React StrictMode
    }

    // Watch AdSense's data-ad-status attribute so the container only appears when an ad actually loads
    const el = insRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      const status = el.getAttribute("data-ad-status");
      if (status === "filled") {
        setIsFilled(true);
      } else if (status === "unfilled") {
        setIsFilled(false);
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => observer.disconnect();
  }, [isUnlocked, slotId]);

  // Never render Google-served ads on the hidden ARG Sanctuary screen or if no slotId is configured
  if (isUnlocked || !slotId) return null;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl px-4 transition-all duration-300 sm:px-6",
        isFilled ? (isTop ? "mt-4 opacity-100" : "mb-6 opacity-100") : "h-0 overflow-hidden opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-center overflow-hidden rounded-xl">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
