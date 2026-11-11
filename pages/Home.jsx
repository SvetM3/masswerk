import React, { useState, useEffect } from "react";
import TabNav from "@/components/TabNav";
import KitchenConverter from "@/components/tools/KitchenConverter";
import PixelRemConverter from "@/components/tools/PixelRemConverter";
import AspectRatioCalculator from "@/components/tools/AspectRatioCalculator";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import WordCounter from "@/components/tools/WordCounter";
import SecretSanctuary from "@/components/SecretSanctuary";
import { useARG } from "../lib/ARGContext";
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

const TAB_SEO = {
  kueche: {
    de: {
      title: "Küchen-Rechner: Cups in Gramm & Fahrenheit in Celsius | Maßwerk",
      desc: "Cups in Gramm und Milliliter umrechnen, Ofentemperaturen anpassen. Kostenlos und ohne Anmeldung.",
    },
    en: {
      title: "Kitchen Converter: Cups to Grams & Fahrenheit to Celsius | Maßwerk",
      desc: "Convert US cups to grams and milliliters, adjust oven temperatures. Fast, free, and no sign-up.",
    },
  },
  rem: {
    de: {
      title: "Pixel in REM Rechner & CSS Einheiten | Maßwerk",
      desc: "Pixelwerte (px) in REM umrechnen bei jeder beliebigen Basis-Schriftgröße für responsives Webdesign.",
    },
    en: {
      title: "Pixel to REM Converter & CSS Units | Maßwerk",
      desc: "Convert pixel values (px) to REM units with custom root font sizes for responsive web typography.",
    },
  },
  format: {
    de: {
      title: "Seitenverhältnis & Aspect Ratio Rechner | Maßwerk",
      desc: "Bildabmessungen und Seitenverhältnisse (16:9, 4:3) proportional berechnen vor dem Export.",
    },
    en: {
      title: "Aspect Ratio Calculator & Image Dimensions | Maßwerk",
      desc: "Calculate proportional image dimensions and aspect ratios (16:9, 4:3) quickly before exporting.",
    },
  },
  prozent: {
    de: {
      title: "Prozent- & MwSt.-Rechner | Maßwerk",
      desc: "Prozentuale Veränderungen, Rabatte und Mehrwertsteuer (MwSt.) in Sekunden berechnen.",
    },
    en: {
      title: "Percentage & VAT Calculator | Maßwerk",
      desc: "Compute percentage increases, discount savings, and regional sales tax rates in seconds.",
    },
  },
  passwort: {
    de: {
      title: "Sicherer Passwort-Generator | Maßwerk",
      desc: "Starke, anpassbare Passwörter sicher und lokal direkt in Ihrem Browser generieren.",
    },
    en: {
      title: "Secure Password Generator | Maßwerk",
      desc: "Generate strong, customizable passwords securely and locally right inside your browser.",
    },
  },
  text: {
    de: {
      title: "Wortzähler & Zeichenzähler | Maßwerk",
      desc: "Wörter, Zeichen, Sätze und geschätzte Lesezeit für Texte und Artikel live zählen.",
    },
    en: {
      title: "Word & Character Counter | Maßwerk",
      desc: "Count words, characters, sentences, and estimated reading time live as you type or paste.",
    },
  },
};

const FAQ_SCHEMA = {
  de: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie viel Gramm ist 1 Cup Mehl?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1 Cup Allzweckmehl entspricht ungefähr 120 bis 125 Gramm. Bei Zucker entspricht 1 Cup etwa 200 Gramm, bei Butter ca. 227 Gramm."
        }
      },
      {
        "@type": "Question",
        "name": "Wie rechnet man Pixel in REM um?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Teile den Pixelwert durch die Basis-Schriftgröße (Standard ist 16px). Zum Beispiel: 24px / 16px = 1.5rem."
        }
      },
      {
        "@type": "Question",
        "name": "Wie rechnet man Fahrenheit in Celsius um?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ziehe 32 vom Fahrenheit-Wert ab und multipliziere das Ergebnis mit 5/9. Beispiel: 350°F minus 32 = 318 * 5/9 = 175°C."
        }
      }
    ]
  },
  en: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many grams is 1 cup of flour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1 cup of all-purpose flour equals approximately 120 to 125 grams. 1 cup of granulated sugar equals about 200 grams, and 1 cup of butter is 227 grams."
        }
      },
      {
        "@type": "Question",
        "name": "How do you convert pixels to REM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Divide the pixel value by your root font size (default is 16px). For example: 24px / 16px = 1.5rem."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert Fahrenheit to Celsius?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Subtract 32 from the Fahrenheit temperature and multiply by 5/9. For example: (350°F - 32) * 5/9 = 175°C."
        }
      }
    ]
  }
};

export default function Home() {
  const [tab, setTab] = useState("kueche");
  const { lang, t } = useI18n();
  const { isUnlocked } = useARG();
  const isDe = lang === "de";

  useEffect(() => {
    const seoData = TAB_SEO[tab]?.[lang] || TAB_SEO.kueche[lang];
    document.title = seoData.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seoData.desc);
    }
  }, [tab, lang]);

  return (
    <div className="rise relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA[lang] || FAQ_SCHEMA.de),
        }}
      />

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
          {isDe ? "Über den Online-Sofortrechner" : "About the Online Instant Converter"}
        </h2>
        <p className="mt-2 text-xs leading-relaxed">
          {isDe
            ? "Maßwerk bietet präzise und kostenlose Werkzeuge für alltägliche Aufgaben. Von der Umrechnung von Backzutaten und Ofentemperaturen über CSS Pixel-zu-REM-Berechnungen bis hin zu Bildseitenverhältnissen, Mehrwertsteuer- und Prozentrechnern – alles läuft clientseitig, sicher und blitzschnell direkt in Ihrem Webbrowser."
            : "Maßwerk provides precise and free tools for everyday tasks. From converting baking ingredients and oven temperatures to CSS pixel-to-REM calculations, image aspect ratios, VAT, and percentage calculators—everything runs client-side, securely, and instantly right in your web browser."}
        </p>
      </section>

      {/* Render Secret Sanctuary when unlocked */}
      {isUnlocked && <SecretSanctuary />}
    </div>
  );
}
