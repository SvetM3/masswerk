import React, { useState } from "react";
import ToolCard from "@/components/ToolCard";
import { formatNumber } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

const WORDS_PER_MINUTE = 200;

function Stat({ label, value, wide = false }) {
  return (
    <div
      className={
        wide
          ? "rounded-xl bg-secondary/60 px-3 py-2.5 col-span-2 sm:col-span-1"
          : "rounded-xl bg-secondary/60 px-3 py-2.5"
      }
    >
      <p className="num text-[20px] font-semibold leading-none text-foreground">{value}</p>
      <p className="mt-1.5 text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export default function WordCounter() {
  const { t } = useI18n();
  const [text, setText] = useState("");

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    ? Math.max((trimmed.match(/[.!?…]+(?=\s|$)/g) || []).length, 1)
    : 0;
  const minutes = words / WORDS_PER_MINUTE;

  return (
    <ToolCard title={t("Zeichen- & Wortzähler")} hint={t("live gezählt")}>
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t("Text einfügen oder tippen …")}
          className="min-h-[190px] w-full resize-y rounded-xl border border-input bg-background px-3.5 py-3 text-[14px] leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5"
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label={t("Wörter")} value={formatNumber(words)} />
          <Stat label={t("Zeichen")} value={formatNumber(characters)} />
          <Stat label={t("Zeichen ohne Leerzeichen")} value={formatNumber(charactersNoSpaces)} />
          <Stat label={t("Sätze")} value={formatNumber(sentences)} />
          <Stat
            label={t("Lesezeit")}
            value={words ? `${formatNumber(Math.max(minutes, 0.1), 1)} ${t("Min.")}` : "–"}
          />
        </div>
      </div>
    </ToolCard>
  );
}