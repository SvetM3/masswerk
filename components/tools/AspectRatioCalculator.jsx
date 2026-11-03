import React, { useState } from "react";
import ToolCard from "@/components/ToolCard";
import { formatNumber, parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const PRESETS = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "9:16", label: "9:16", w: 9, h: 16 },
  { id: "21:9", label: "21:9", w: 21, h: 9 },
];

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

const fieldClass =
  "num w-full rounded-xl border border-input bg-background px-3.5 py-3 text-lg font-semibold text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5";

function greatestCommonDivisor(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const rest = x % y;
    x = y;
    y = rest;
  }
  return x || 1;
}

export default function AspectRatioCalculator() {
  const { t } = useI18n();
  const [ratioW, setRatioW] = useState("1920");
  const [ratioH, setRatioH] = useState("1080");
  const [mode, setMode] = useState("width");
  const [value, setValue] = useState("1920");

  const width = parseDecimal(ratioW);
  const height = parseDecimal(ratioH);
  const ratioValid = Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0;

  const input = parseDecimal(value);
  const inputValid = ratioValid && Number.isFinite(input) && input > 0;
  const result = inputValid
    ? mode === "width"
      ? (input * height) / width
      : (input * width) / height
    : null;

  const divisor = ratioValid
    ? greatestCommonDivisor(Math.round(width), Math.round(height))
    : 1;
  const simplified = ratioValid
    ? `${formatNumber(Math.round(width) / divisor)} : ${formatNumber(Math.round(height) / divisor)}`
    : "–";
  const ratioDecimal = ratioValid ? width / height : null;

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <ToolCard title={t("Seitenverhältnis")} hint={t("Breite : Höhe")}>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <div>
              <label htmlFor="ratio-w" className={labelClass}>
                {t("Breite")}
              </label>
              <input
                id="ratio-w"
                type="text"
                inputMode="decimal"
                value={ratioW}
                onChange={(event) => setRatioW(event.target.value)}
                className={fieldClass}
              />
            </div>
            <span className="num pb-3 text-lg text-muted-foreground">:</span>
            <div>
              <label htmlFor="ratio-h" className={labelClass}>
                {t("Höhe")}
              </label>
              <input
                id="ratio-h"
                type="text"
                inputMode="decimal"
                value={ratioH}
                onChange={(event) => setRatioH(event.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => {
              const isActive =
                ratioValid &&
                Math.round(width) * preset.h === Math.round(height) * preset.w;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setRatioW(String(preset.w));
                    setRatioH(String(preset.h));
                  }}
                  className={cn(
                    "min-h-[38px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl bg-secondary/60 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Verhältnis")}
            </p>
            <div className="mt-1.5 flex items-end gap-1.5">
              <span className="num text-[32px] font-semibold leading-none text-foreground">
                {simplified}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">
              {ratioDecimal === null
                ? t("Bitte gültige Werte eingeben.")
                : `${formatNumber(ratioDecimal, 2)} : 1`}
            </p>
          </div>
        </div>
      </ToolCard>

      <ToolCard title={t("Neue Größe berechnen")} hint={t("proportional skalieren")}>
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-border bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => setMode("width")}
              className={cn(
                "min-h-[36px] rounded-full px-4 text-[12px] font-medium transition-colors",
                mode === "width"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("Breite vorgeben")}
            </button>
            <button
              type="button"
              onClick={() => setMode("height")}
              className={cn(
                "min-h-[36px] rounded-full px-4 text-[12px] font-medium transition-colors",
                mode === "height"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("Höhe vorgeben")}
            </button>
          </div>

          <div>
            <label htmlFor="target-value" className={labelClass}>
              {mode === "width" ? t("Neue Breite in px") : t("Neue Höhe in px")}
            </label>
            <input
              id="target-value"
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="rounded-xl bg-secondary/60 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {mode === "width" ? t("Ergibt Höhe") : t("Ergibt Breite")}
            </p>
            <div className="mt-1.5 flex items-end gap-1.5">
              <span className="num text-[36px] font-semibold leading-none text-foreground">
                {result === null ? "–" : formatNumber(result, 2)}
              </span>
              <span className="pb-1 text-base font-medium text-muted-foreground">px</span>
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">
              {result === null
                ? t("Bitte ein Seitenverhältnis und einen Wert angeben.")
                : `${formatNumber(input)} × ${
                    mode === "width" ? formatNumber(result, 2) : formatNumber(input)
                  } px`}
            </p>
          </div>

          <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-secondary/30 p-3">
            <div
              className="rounded-md border border-dashed border-foreground/30 bg-card"
              style={{
                aspectRatio: `${ratioValid ? width : 16} / ${ratioValid ? height : 9}`,
                height: "100%",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </ToolCard>
    </div>
  );
}