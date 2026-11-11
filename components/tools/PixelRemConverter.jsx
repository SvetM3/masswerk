import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { formatNumber, parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useARG } from "../../lib/ARGContext";

const BASE_PRESETS = [14, 16, 18, 20];
const COMMON_PX = [4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64];

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

export default function PixelRemConverter() {
  const { t } = useI18n();
  const { reportToolState } = useARG(); // <--- 2. Get reportToolState function
  const [base, setBase] = useState(16);
  const [px, setPx] = useState("24");

  const parsedPx = parseDecimal(px);
  const isValid = Number.isFinite(parsedPx) && parsedPx >= 0;
  const rem = isValid && base > 0 ? parsedPx / base : null;

  const changeBase = (delta) => setBase((current) => Math.min(32, Math.max(8, current + delta)));

  // 3. Handler to update state and report to ARG engine
  const handlePxChange = (val) => {
    setPx(val);
    reportToolState("rem", "px", val);
  };

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <ToolCard title={t("Pixel in REM")} hint={t("px ÷ Basis = rem")}>
        <div className="space-y-4">
          <div>
            <label htmlFor="px" className={labelClass}>
              {t("Pixelwert")}
            </label>
            <div className="relative">
              <input
                id="px"
                type="text"
                inputMode="decimal"
                value={px}
                onChange={(event) => handlePxChange(event.target.value)}
                className="num w-full rounded-xl border border-input bg-background px-3.5 py-3 text-lg font-semibold text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                px
              </span>
            </div>
          </div>

          <div>
            <span className={labelClass}>{t("Basis-Schriftgröße")}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={t("Basis verkleinern")}
                onClick={() => changeBase(-1)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="num flex-1 rounded-xl border border-input bg-background py-2.5 text-center text-lg font-semibold text-foreground">
                {base}
                <span className="ml-1 text-xs font-normal text-muted-foreground">px</span>
              </div>
              <button
                type="button"
                aria-label={t("Basis vergrößern")}
                onClick={() => changeBase(1)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {BASE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBase(preset)}
                  className={cn(
                    "min-h-[34px] rounded-lg border px-3 text-[12px] font-medium transition-colors",
                    base === preset
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {preset} px
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-secondary/60 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Ergebnis")}
            </p>
            <div className="mt-1.5 flex items-end gap-1.5">
              <span className="num text-[36px] font-semibold leading-none text-foreground">
                {rem === null ? "–" : formatNumber(rem, 4)}
              </span>
              <span className="pb-1 text-base font-medium text-muted-foreground">rem</span>
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">
              {t("1 rem = {rem} px · 1 px = {px} rem", {
                rem: base,
                px: formatNumber(1 / base, 4),
              })}
            </p>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {t(
              "Der REM-Wert bezieht sich auf die Schriftgröße des Wurzelelements – im Browser standardmäßig 16 px."
            )}
          </p>
        </div>
      </ToolCard>

      <ToolCard
        title={t("Häufige Werte")}
        hint={t("Basis {px} px", { px: formatNumber(base) })}
      >
        <div>
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span>{t("Pixel")}</span>
            <span>{t("REM")}</span>
          </div>
          <ul className="divide-y divide-border">
            {COMMON_PX.map((value) => (
              <li key={value} className="flex items-center justify-between py-[7px]">
                <span className="num text-[13px] text-muted-foreground">{value} px</span>
                <span className="num text-[13px] font-medium text-foreground">
                  {formatNumber(value / base, 4)} rem
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Vorschau")}
            </p>
            <p
              className="mt-1 font-heading font-medium leading-tight text-foreground"
              style={{ fontSize: `${isValid ? Math.min(parsedPx, 48) : 16}px` }}
            >
              {t("Schnell umgerechnet")}
            </p>
          </div>
        </div>
      </ToolCard>
    </div>
  );
}
