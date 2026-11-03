import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { INGREDIENT_GROUPS, KITCHEN_UNITS, convertKitchen, findIngredient } from "@/lib/unitConversions";
import { formatQuantity, parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const QUICK_AMOUNTS = [
  { label: "¼", value: 0.25 },
  { label: "½", value: 0.5 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-3.5 py-3 text-[15px] text-foreground outline-none transition focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

export default function IngredientConverter() {
  const { lang, t } = useI18n();
  const [ingredientId, setIngredientId] = useState("mehl405");
  const [unitId, setUnitId] = useState("cup_us");
  const [amount, setAmount] = useState("1");

  const ingredient = findIngredient(ingredientId);
  const unit = KITCHEN_UNITS.find((item) => item.id === unitId) ?? KITCHEN_UNITS[0];
  const parsedAmount = parseDecimal(amount);
  const isValid = Number.isFinite(parsedAmount) && parsedAmount > 0;

  const result = useMemo(
    () => convertKitchen(parsedAmount, unit, ingredient),
    [parsedAmount, unit, ingredient]
  );

  const liquidFirst = Boolean(ingredient.liquid);
  const primaryValue = liquidFirst ? result.ml : result.grams;
  const secondaryValue = liquidFirst ? result.grams : result.ml;
  const primaryUnit = liquidFirst ? "ml" : "g";
  const secondaryUnit = liquidFirst ? "g" : "ml";

  const formatQuickValue = (value) => {
    const raw = String(value);
    return lang === "en" ? raw : raw.replace(".", ",");
  };

  return (
    <ToolCard title={t("Zutaten-Umrechner")} hint={t("US & UK → metrisch")}>
      <div className="space-y-4">
        <div>
          <label htmlFor="zutat" className={labelClass}>
            {t("Zutat")}
          </label>
          <div className="relative">
            <select
              id="zutat"
              value={ingredientId}
              onChange={(event) => setIngredientId(event.target.value)}
              className={cn(fieldClass, "appearance-none pr-11 font-medium")}
            >
              {INGREDIENT_GROUPS.map((group) => (
                <optgroup key={group.label} label={t(group.label)}>
                  {group.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {t(item.label)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div>
          <span className={labelClass}>{t("Menge & Einheit")}</span>
          <div className="flex flex-wrap items-center gap-2">
            <input
              aria-label={t("Menge")}
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className={cn(fieldClass, "num w-[92px] px-2 text-center text-lg font-semibold")}
            />
            <div className="flex flex-wrap gap-1.5">
              {KITCHEN_UNITS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setUnitId(option.id)}
                  className={cn(
                    "min-h-[44px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    unitId === option.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {t(option.label)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {QUICK_AMOUNTS.map((quick) => (
              <button
                key={quick.label}
                type="button"
                onClick={() => setAmount(formatQuickValue(quick.value))}
                className="min-h-[32px] min-w-[40px] rounded-lg border border-border bg-secondary/60 px-2 text-[12px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {quick.label}
              </button>
            ))}
            <span className="ml-1 text-[11px] text-muted-foreground">{t("Schnellwahl")}</span>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/60 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("Ergebnis")}
          </p>
          <div className="mt-1.5 flex items-end gap-1.5">
            <span className="num text-[36px] font-semibold leading-none text-foreground">
              {isValid ? formatQuantity(primaryValue) : "–"}
            </span>
            <span className="pb-1 text-base font-medium text-muted-foreground">{primaryUnit}</span>
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            {isValid
              ? t("entspricht ca. {value} {unit}", {
                  value: formatQuantity(secondaryValue),
                  unit: secondaryUnit,
                })
              : t("Bitte eine Menge größer als 0 eingeben.")}
          </p>
        </div>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {t(
            "Richtwerte: 1 Cup (US) ≈ 237 ml · 1 Cup (UK) ≈ 284 ml · 1 EL = 15 ml · 1 TL = 5 ml. Je nach Zutat und Körnung können die Grammwerte leicht abweichen."
          )}
        </p>
      </div>
    </ToolCard>
  );
}