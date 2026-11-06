import React, { useState } from "react";
import TabNav from "@/components/TabNav";
import KitchenConverter from "@/components/tools/KitchenConverter";
import PixelRemConverter from "@/components/tools/PixelRemConverter";
import AspectRatioCalculator from "@/components/tools/AspectRatioCalculator";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import WordCounter from "@/components/tools/WordCounter";
import { useI18n } from "@/lib/i18n";

const HINTS = [
  {
    title: "Backen",
    text: "Cups, Ounces und Gasstufen direkt in Gramm, Milliliter und Grad Celsius umrechnen – ohne Tabellen suchen.",
  },
  {
    title: "Web & Design",
    text: "Pixelwerte in REM übertragen, mit jeder Basis-Schriftgröße – für konsistente Typografie im Projekt.",
  },
  {
    title: "Bildformate",
    text: "Seitenverhältnisse prüfen und neue Bildmaße proportional berechnen, bevor der Export startet.",
  },
  {
    title: "Steuern & Finanzen",
    text: "Prozentuale Unterschiede berechnen und regionale MwSt.-Sätze in Sekunden aufschlagen oder herausrechnen.",
  },
  {
    title: "Sicherheit",
    text: "Starke, anpassbare Passwörter direkt im Browser erzeugen – ganz ohne Übertragung Ihrer Daten.",
  },
  {
    title: "Text & Schreiben",
    text: "Wörter, Zeichen, Sätze und die geschätzte Lesezeit live zählen, während Sie tippen oder einfügen.",
  },
];

export default function Home() {
  const [tab, setTab] = useState("kueche");
  const { t } = useI18n();

  return (
    <div className="rise">
      <section className="pb-5 pt-6 sm:pb-6 sm:pt-10">
        <h1 className="font-heading text-[26px] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-[38px]">
          {t("Sofort umrechnen.")}
        </h1>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground sm:text-[15px]">
          {t(
            "Cups in Gramm, Fahrenheit in Celsius, Pixel in REM – in Sekunden, direkt im Browser und ohne Anmeldung."
          )}
        </p>
      </section>

      <TabNav active={tab} onChange={setTab} />

      <div key={tab} className="rise mt-4 sm:mt-5" role="tabpanel" id={`panel-${tab}`}>
        {tab === "kueche" && <KitchenConverter />}
        {tab === "rem" && <PixelRemConverter />}
        {tab === "format" && <AspectRatioCalculator />}
        {tab === "prozent" && <PercentageCalculator />}
        {tab === "passwort" && <PasswordGenerator />}
        {tab === "text" && <WordCounter />}
      </div>

      <section className="mt-10 border-t border-border pt-7 sm:mt-12">
        <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {t("Wofür Sie den Rechner nutzen")}
        </h2>
        <div className="mt-4 grid gap-x-4 gap-y-5 sm:grid-cols-3">
          {HINTS.map((hint) => (
            <div key={hint.title}>
              <h3 className="font-heading text-[14px] font-semibold tracking-tight text-foreground">
                {t(hint.title)}
              </h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                {t(hint.text)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Enrichment Block */}
      <section className="mt-12 border-t border-border/60 pt-8 text-muted-foreground">
        <h2 className="font-heading text-sm font-semibold text-foreground">
          {t("Über den Online-Sofortrechner")}
        </h2>
        <p className="mt-2 text-xs leading-relaxed">
          {t(
            "Maßwerk bietet präzise und kostenlose Werkzeuge für alltägliche Aufgaben. Von der Umrechnung von Backzutaten und Ofentemperaturen über CSS Pixel-zu-REM-Berechnungen bis hin zu Bildseitenverhältnissen, Mehrwertsteuer- und Prozentrechnern – alles läuft clientseitig, sicher und blitzschnell direkt in Ihrem Webbrowser."
          )}
        </p>
      </section>
    </div>
  );
}
