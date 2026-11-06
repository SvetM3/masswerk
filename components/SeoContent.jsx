import React from "react";
import { useI18n } from "@/lib/i18n";

export default function SeoContent() {
  const { lang } = useI18n();
  const isDe = lang === "de";

  return (
    <section className="mt-16 border-t border-border/60 pt-12 text-foreground/80">
      <div className="space-y-10">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
            {isDe
              ? "Kostenloser Sofortrechner für Küche, Webdesign & Alltag"
              : "Free Instant Converter for Kitchen, Web Design & Daily Math"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isDe
              ? "Maßwerk ist dein schnelles, werbefreundliches und präzises Online-Werkzeug für alltägliche Umrechnungen. Egal ob du ein amerikanisches Rezept nachbacken möchtest, deine Web-Typografie in REM anpasst oder den genauen MwSt.-Betrag benötigst – alle Berechnungen erfolgen sofort direkt in deinem Browser ohne Registrierung."
              : "Maßwerk is your fast, clean, and accurate online tool for everyday conversions. Whether you are baking from US recipes, setting up responsive web typography in REM, or calculating VAT differences—everything computes instantly in your browser without any account required."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Baking Section */}
          <div className="rounded-xl border border-border/70 bg-card/50 p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {isDe ? "🍳 Küchen- & Back-Umrechner (Cups in Gramm)" : "🍳 Kitchen & Baking Converter (Cups to Grams)"}
            </h3>
            <p className="mt-2 text-xs leading-normal text-muted-foreground sm:text-sm">
              {isDe
                ? "Rezept aus den USA oder UK gefunden? Wandle US Cups in Gramm (g) und Milliliter (ml) um. Berechne Ofentemperaturen bequem von Fahrenheit (°F) in Celsius (°C) und Gasstufen um."
                : "Found an international recipe? Convert US Cups to grams (g) and milliliters (ml) for flour, sugar, and butter. Convert oven temperatures seamlessly between Fahrenheit (°F), Celsius (°C), and Gas Marks."}
            </p>
          </div>

          {/* Web Design Section */}
          <div className="rounded-xl border border-border/70 bg-card/50 p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {isDe ? "📐 Webdesign: Pixel in REM & Aspect Ratio" : "📐 Web & Design: Pixels to REM & Aspect Ratios"}
            </h3>
            <p className="mt-2 text-xs leading-normal text-muted-foreground sm:text-sm">
              {isDe
                ? "Wandle Pixel (px) bei jeder beliebigen Base Font-Size (default 16px) direkt in REM um für moderne, barrierefreie CSS-Stylesheets. Berechne Seitenverhältnisse (16:9, 4:3, 21:9) und Pixelabmessungen exakt."
                : "Convert pixel values (px) to REM units based on custom root font sizes for accessible CSS typography. Calculate image dimensions and aspect ratios (16:9, 4:3, 21:9) quickly before exporting assets."}
            </p>
          </div>

          {/* Math & Tax Section */}
          <div className="rounded-xl border border-border/70 bg-card/50 p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {isDe ? "📊 Prozent- & MwSt.-Rechner" : "📊 Percentage & VAT Calculator"}
            </h3>
            <p className="mt-2 text-xs leading-normal text-muted-foreground sm:text-sm">
              {isDe
                ? "Berechne schnell prozentuale Veränderungen, Rabatte und die Mehrwertsteuer (19% & 7% in Deutschland / 20% in Österreich). Füge MwSt. hinzu oder rechne sie aus dem Bruttobetrag heraus."
                : "Easily compute percentage increases, discount savings, and regional VAT rates. Add or remove sales tax from gross values in seconds."}
            </p>
          </div>

          {/* Security & Text Section */}
          <div className="rounded-xl border border-border/70 bg-card/50 p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {isDe ? "🔒 Datenschutz-Tools & Wortzähler" : "🔒 Privacy Tools & Word Counter"}
            </h3>
            <p className="mt-2 text-xs leading-normal text-muted-foreground sm:text-sm">
              {isDe
                ? "Generiere sichere, zufällige Passwörter direkt auf deinem Gerät. Nutze den Wort- und Zeichenzähler für Texte, Essays oder Social-Media-Posts mit geschätzter Lesezeit."
                : "Generate strong, secure passwords locally in your browser with full client-side privacy. Count words, characters, sentences, and estimated reading time live as you type."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
