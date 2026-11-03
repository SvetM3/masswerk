import React, { useState } from "react";
import ToolCard from "@/components/ToolCard";
import { formatNumber, parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const VAT_PRESETS = ["19", "20", "8.1"];

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

const fieldClass =
  "num w-full rounded-xl border border-input bg-background px-3.5 py-3 text-lg font-semibold text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5";

const MODES = [
  { id: "add", label: "Aufschlagen" },
  { id: "remove", label: "Herausrechnen" },
];

function BreakdownRow({ label, value, strong = false }) {
  return (
    <li className="flex items-center justify-between py-[5px]">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span
        className={cn(
          "num text-[13px]",
          strong ? "font-semibold text-foreground" : "text-foreground/80"
        )}
      >
        {value}
      </span>
    </li>
  );
}

export default function PercentageCalculator() {
  const { t } = useI18n();

  const [mode, setMode] = useState("add");
  const [rate, setRate] = useState("19");
  const [amount, setAmount] = useState("100");

  const [sharePct, setSharePct] = useState("15");
  const [shareBase, setShareBase] = useState("250");

  const [fromValue, setFromValue] = useState("120");
  const [toValue, setToValue] = useState("150");

  const percent = parseDecimal(rate);
  const value = parseDecimal(amount);
  const vatValid = Number.isFinite(percent) && percent >= 0 && Number.isFinite(value) && value > 0;

  const net = vatValid ? (mode === "add" ? value : value / (1 + percent / 100)) : null;
  const vat = vatValid ? (mode === "add" ? (value * percent) / 100 : value - net) : null;
  const gross = vatValid ? net + vat : null;
  const primary = vatValid ? (mode === "add" ? gross : net) : null;

  const share = parseDecimal(sharePct);
  const base = parseDecimal(shareBase);
  const shareValid = Number.isFinite(share) && Number.isFinite(base);
  const shareResult = shareValid ? (base * share) / 100 : null;

  const from = parseDecimal(fromValue);
  const to = parseDecimal(toValue);
  const changeValid = Number.isFinite(from) && from !== 0 && Number.isFinite(to);
  const change = changeValid ? ((to - from) / Math.abs(from)) * 100 : null;

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <ToolCard title={t("MwSt. berechnen")} hint={t("Betrag ± MwSt.")}>
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

          <div>
            <label htmlFor="vat-amount" className={labelClass}>
              {mode === "add" ? t("Netto") : t("Brutto")}
            </label>
            <input
              id="vat-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <span className={labelClass}>{t("MwSt.-Satz")}</span>
            <div className="flex flex-wrap gap-1.5">
              {VAT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRate(preset)}
                  className={cn(
                    "min-h-[38px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    rate === preset
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {formatNumber(Number(preset), 1)} %
                </button>
              ))}
              <input
                aria-label={t("Eigener Satz")}
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(event) => setRate(event.target.value)}
                className="num h-[38px] w-[74px] rounded-full border border-input bg-background px-3 text-center text-[13px] font-medium text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5"
              />
            </div>
          </div>

          <div className="rounded-xl bg-secondary/60 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Ergebnis")}
            </p>
            <div className="mt-1.5 flex items-end gap-1.5">
              <span className="num text-[36px] font-semibold leading-none text-foreground">
                {primary === null ? "–" : formatNumber(primary, 2)}
              </span>
            </div>
            <ul className="mt-2.5 border-t border-border/70 pt-2">
              <BreakdownRow
                label={t("Netto")}
                value={net === null ? "–" : formatNumber(net, 2)}
                strong={mode === "remove"}
              />
              <BreakdownRow
                label={t("MwSt.")}
                value={vat === null ? "–" : formatNumber(vat, 2)}
              />
              <BreakdownRow
                label={t("Brutto")}
                value={gross === null ? "–" : formatNumber(gross, 2)}
                strong={mode === "add"}
              />
            </ul>
            {!vatValid && (
              <p className="mt-1.5 text-[12px] text-muted-foreground">
                {t("Bitte einen Betrag eingeben.")}
              </p>
            )}
          </div>
        </div>
      </ToolCard>

      <ToolCard title={t("Prozentrechnung")} hint="X % · A → B">
        <div className="space-y-4">
          <div>
            <span className={labelClass}>{t("Prozentwert")}</span>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <input
                aria-label={t("Prozentsatz")}
                type="text"
                inputMode="decimal"
                value={sharePct}
                onChange={(event) => setSharePct(event.target.value)}
                className={fieldClass}
              />
              <span className="text-[13px] font-medium text-muted-foreground">%</span>
              <input
                aria-label={t("Grundwert")}
                type="text"
                inputMode="decimal"
                value={shareBase}
                onChange={(event) => setShareBase(event.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="mt-2.5 rounded-xl bg-secondary/60 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("Ergebnis")}
              </p>
              <p className="num mt-1 text-[22px] font-semibold leading-none text-foreground">
                {shareResult === null ? "–" : formatNumber(shareResult, 2)}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <span className={labelClass}>{t("Veränderung")}</span>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div>
                <label htmlFor="change-from" className="mb-1 block text-[11px] text-muted-foreground">
                  {t("Von")}
                </label>
                <input
                  id="change-from"
                  type="text"
                  inputMode="decimal"
                  value={fromValue}
                  onChange={(event) => setFromValue(event.target.value)}
                  className={fieldClass}
                />
              </div>
              <span className="mt-4 text-[13px] font-medium text-muted-foreground">→</span>
              <div>
                <label htmlFor="change-to" className="mb-1 block text-[11px] text-muted-foreground">
                  {t("Auf")}
                </label>
                <input
                  id="change-to"
                  type="text"
                  inputMode="decimal"
                  value={toValue}
                  onChange={(event) => setToValue(event.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="mt-2.5 rounded-xl bg-secondary/60 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {changeValid && change > 0
                  ? t("Zunahme")
                  : changeValid && change < 0
                    ? t("Abnahme")
                    : t("Veränderung")}
              </p>
              <p className="num mt-1 text-[22px] font-semibold leading-none text-foreground">
                {change === null
                  ? "–"
                  : change === 0
                    ? t("Keine Veränderung")
                    : `${change > 0 ? "+" : "−"}${formatNumber(Math.abs(change), 2)} %`}
              </p>
            </div>
            {!changeValid && (
              <p className="mt-1.5 text-[12px] text-muted-foreground">
                {t("Bitte Werte eingeben.")}
              </p>
            )}
          </div>
        </div>
      </ToolCard>
    </div>
  );
}