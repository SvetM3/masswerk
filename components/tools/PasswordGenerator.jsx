import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useARG } from "../../lib/ARGContext";

const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  numbers: "23456789",
  symbols: "!@#$%&*?+-=",
};

function randomInt(max) {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  return buffer[0] % max;
}

function buildPassword(length, options) {
  const pools = [SETS.lower, SETS.upper];
  if (options.numbers) pools.push(SETS.numbers);
  if (options.symbols) pools.push(SETS.symbols);

  const all = pools.join("");
  const chars = pools.map((pool) => pool[randomInt(pool.length)]);

  while (chars.length < length) {
    chars.push(all[randomInt(all.length)]);
  }

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

const TOGGLES = [
  { id: "numbers", label: "Zahlen" },
  { id: "symbols", label: "Symbole" },
];

export default function PasswordGenerator() {
  const { t } = useI18n();
  const { reportToolState } = useARG(); // <--- 2. Get reportToolState function
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ numbers: true, symbols: true });
  const [password, setPassword] = useState(() =>
    buildPassword(16, { numbers: true, symbols: true })
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassword(buildPassword(length, options));
    setCopied(false);
  }, [length, options]);

  const regenerate = () => {
    setPassword(buildPassword(length, options));
    setCopied(false);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
    }
  };

  // 3. Handler to update length and report to the ARG engine
  const handleLengthChange = (val) => {
    setLength(val);
    reportToolState("passwort", "length", val);
  };

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <ToolCard title={t("Passwort-Generator")} hint={t("sicher generiert")}>
        <div className="space-y-4">
          <div className="rounded-xl bg-secondary/60 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Ergebnis")}
            </p>
            <p className="num mt-2 break-all text-[19px] font-semibold leading-snug text-foreground">
              {password}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={copyPassword}
                className={cn(
                  "flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors",
                  copied
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                )}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("Kopiert") : t("Kopieren")}
              </button>
              <button
                type="button"
                onClick={regenerate}
                className="flex min-h-[40px] items-center gap-2 rounded-full border border-border bg-card px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {t("Neu erzeugen")}
              </button>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {t(
              "Passwörter entstehen zufällig im Browser und werden nicht übertragen oder gespeichert."
            )}
          </p>
        </div>
      </ToolCard>

      <ToolCard title={t("Länge")} hint={`${length}`}>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("Länge")}
              </span>
              <span className="num text-[13px] font-semibold text-foreground">
                {length} / 64
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="1"
              value={length}
              aria-label={t("Länge")}
              onChange={(event) => handleLengthChange(Number(event.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-foreground"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("Zeichen")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TOGGLES.map((toggle) => {
                const isActive = options[toggle.id];
                return (
                  <button
                    key={toggle.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setOptions((current) => ({ ...current, [toggle.id]: !current[toggle.id] }))
                    }
                    className={cn(
                      "min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {t(toggle.label)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ToolCard>
    </div>
  );
}
