import React, { useState } from "react";
import ToolCard from "@/components/ToolCard";
import {
  GAS_MARKS,
  QUICK_FAHRENHEIT,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from "@/lib/unitConversions";
import { formatNumber, parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

const MODES = [
  { id: "fahrenheit", label: "Fahrenheit" },
  { id: "gas", label: "Gasstufe" },
];

export default function TemperatureConverter() {
  const { t } = useI18n();
  const [mode, setMode] = useState("fahrenheit");
  const [fahrenheit, setFahrenheit] = useState("350");
  const [gasMark, setGasMark] = useState("4");

  const parsedFahrenheit = parseDecimal(fahrenheit);
  const gas = GAS_MARKS.find((item) => item.mark === gasMark) ?? GAS_MARKS[4];

  const celsius =
    mode === "fahrenheit"
      ? Number.isFinite(parsedFahrenheit) && parsedFahrenheit > 0
        ? fahrenheitToCelsius(parsedFahrenheit)
        : null
      : gas.celsius;

  const umluft = celsius === null ? null : celsius - 20;
  const fahrenheitValue = celsius === null ? null : celsiusToFahrenheit(celsius);

  return (
    <ToolCard title={t("Backtemperatur")} hint={t("°F & Gasstufe → °C")}>
      <div className="space-y-4">
        <div className="inline-flex rounded-full border border-border bg-secondary/60 p-1">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={cn(
                "min-h-[36px] rounded-full px-4 text-[12px] font-medium transition-colors",
                mode === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(item.label)}
            </button>
          ))}
        </div>

        {mode === "fahrenheit" ? (
          <div>
            <label htmlFor="fahrenheit" className={labelClass}>
              {t("Temperatur in °F")}
            </label>
            <div className="relative">
              <input
                id="fahrenheit"
                type="text"
                inputMode="decimal"
                value={fahrenheit}
                onChange={(event) => setFahrenheit(event.target.value)}
                className="num w-full rounded-xl border border-input bg-background px-3.5 py-3 text-lg font-semibold text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                °F
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {QUICK_FAHRENHEIT.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode("fahrenheit");
                    setFahrenheit(String(value));
                  }}
                  className={cn(
                    "min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    mode === "fahrenheit" && String(value) === fahrenheit
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {value} °F
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <span className={labelClass}>{t("Gasstufe")}</span>
            <div className="flex flex-wrap gap-1.5">
              {GAS_MARKS.map((item) => (
                <button
                  key={item.mark}
                  type="button"
                  onClick={() => setGasMark(item.mark)}
                  className={cn(
                    "min-h-[40px] min-w-[42px] rounded-full border px-3 text-[13px] font-medium transition-colors",
                    gasMark === item.mark
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {item.mark}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-secondary/60 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("Ergebnis")}
          </p>
          <div className="mt-1.5 flex items-end gap-1.5">
            <span className="num text-[36px] font-semibold leading-none text-foreground">
              {celsius === null ? "–" : `${formatNumber(celsius)} °C`}
            </span>
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            {celsius === null
              ? t("Bitte eine Temperatur eingeben.")
              : t("Ober-/Unterhitze")}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-lg border border-border bg-card px-2.5 py-1 text-[12px] text-foreground">
              {t("Umluft")} {umluft === null ? "–" : `${formatNumber(umluft)} °C`}
            </span>
            <span className="rounded-lg border border-border bg-card px-2.5 py-1 text-[12px] text-muted-foreground">
              ≈ {fahrenheitValue === null ? "–" : `${formatNumber(fahrenheitValue)} °F`}
            </span>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {t(
            "Werte sind auf handelsübliche Ofenstufen gerundet. Umluft entspricht in der Regel 20 °C weniger als Ober-/Unterhitze."
          )}
        </p>
      </div>
    </ToolCard>
  );
}