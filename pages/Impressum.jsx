import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function Impressum() {
  const { lang } = useI18n();
  const isDe = lang === "de";

  useEffect(() => {
    document.title = isDe
      ? "Impressum & Anbieterkennzeichnung | Maßwerk"
      : "Imprint & Legal Notice | Maßwerk";
  }, [isDe]);

  const faqs = isDe
    ? [
        {
          q: "Wer betreibt die Plattform Maßwerk?",
          a: "Maßwerk ist ein unabhängiges Web-Angebot für schnelle Alltags- und Fachrechner (wie Küchen-Umrechnungen, Pixel-in-REM, Seitenverhältnisse, Prozent-/MwSt.-Berechnungen, Passwortgenerierung und Textanalyse). Die Anbieterangaben finden Sie unter „Angaben zum Diensteanbieter“.",
        },
        {
          q: "Werden eingegebene Werte aus den Rechnern auf dem Server gespeichert?",
          a: "Nein. Die Berechnungen laufen direkt lokal im Browser des Nutzers. Eingaben aus Rechnern oder Textfeldern werden nicht an eigene Datenbanken übertragen oder dauerhaft gespeichert.",
        },
        {
          q: "Wie kann ich Fehler bei Umrechnungen oder Formeln melden?",
          a: "Sie können Hinweise zu Formeln, Richtwerten oder Darstellungsfehlern per E-Mail an sofortrechner@gmx.net senden, damit wir sie prüfen und korrigieren können.",
        },
        {
          q: "Gelten die Hinweise auf dieser Seite auch für verlinkte externe Websites?",
          a: "Für Inhalte externer Websites, auf die verwiesen wird, sind ausschließlich deren jeweilige Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung wurden keine rechtswidrigen Inhalte erkannt.",
        },
      ]
    : [
        {
          q: "Who operates the Maßwerk web application?",
          a: "Maßwerk is an independent web utility platform offering fast everyday calculators and tools across baking/kitchen measurements, CSS px-to-rem conversions, aspect ratios, percentage/VAT math, local password generation, and word/character counting. Publisher details are listed under Service Provider Details.",
        },
        {
          q: "Are numbers or text entered into the tools stored on a server?",
          a: "No. Tools run locally inside your browser session and are not saved to an application database by Maßwerk.",
        },
        {
          q: "How can I report an inaccuracy or suggest an improvement?",
          a: "You can reach out by email at sofortrechner@gmx.net with the tool name, inputs, and expected result so we can review it.",
        },
        {
          q: "Does this notice cover third-party websites linked from the site?",
          a: "External websites remain the responsibility of their respective operators, and links are reviewed at the time they are added.",
        },
      ];

  return (
    <div className="rise mx-auto max-w-3xl py-8 sm:py-12 space-y-8 text-foreground">
      <div className="space-y-2 border-b border-border pb-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {isDe ? "Rechtliche Hinweise" : "Legal Information"}
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight">
          {isDe ? "Impressum" : "Imprint"}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isDe
            ? "Informationen gemäß den gesetzlichen Transparenz- und Anbieterkennzeichnungspflichten für das Webangebot Maßwerk (masswerktools.com)."
            : "Publisher and transparency information for the Maßwerk web platform (masswerktools.com)."}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "Angaben zum Diensteanbieter" : "Service Provider Details"}
        </h2>
        <div className="rounded-xl border border-border/70 bg-secondary/20 p-5 text-sm leading-relaxed text-muted-foreground space-y-1.5">
          <p className="font-medium text-foreground">Maßwerk</p>
          <p>Sofortrechner 9A</p>
          <p>6200 Jenbach</p>
          <p>
            {isDe ? "E-Mail: " : "Email: "}
            <a
              href="mailto:sofortrechner@gmx.net"
              className="font-mono text-foreground underline underline-offset-4 hover:opacity-80"
            >
              sofortrechner@gmx.net
            </a>
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "Zweck des Angebots & Haftung für Inhalte" : "Purpose of Service & Content Liability"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Maßwerk stellt kostenlose Werkzeuge und erläuternde Hintergrundtexte für alltägliche Berechnungen zur Verfügung. Alle Inhalte werden mit größtmöglicher Sorgfalt erstellt und regelmäßig gepflegt. Dennoch kann keine Gewähr für die vollständige Richtigkeit, Vollständigkeit und Aktualität aller Richtwerte, Steuersätze oder Umrechnungen im Einzelfall übernommen werden – insbesondere bei steuerlichen, rechtlichen oder sicherheitskritischen Entscheidungen."
            : "Maßwerk provides free calculators and explanatory guides for everyday reference tasks. While content is prepared and maintained with care, no guarantee is made for complete accuracy, completeness, or suitability for tax, legal, or safety-critical decisions without independent verification."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "Urheberrecht und geistiges Eigentum" : "Copyright & Intellectual Property"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Die durch den Seitenbetreiber erstellten Texte, Strukturen, Gestaltungselemente und Komponenten auf diesen Seiten unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung."
            : "Original text, layout structure, and interface components created for Maßwerk are protected by applicable copyright law. Reproduction, adaptation, or redistribution beyond statutory limits requires prior permission."}
        </p>
      </section>

      <section className="space-y-4 border-t border-border pt-6">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {isDe ? "Häufig gestellte Fragen (FAQ)" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="border-b border-border/50 pb-4 last:border-none">
              <h3 className="font-heading text-[14.5px] font-semibold text-foreground">
                {item.q}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        <Link to="/" className="font-medium text-foreground underline underline-offset-4">
          {isDe ? "← Zurück zu den Rechnern" : "← Back to calculators"}
        </Link>
        <Link to="/datenschutz" className="text-muted-foreground hover:text-foreground transition">
          {isDe ? "Datenschutzerklärung →" : "Privacy Policy →"}
        </Link>
      </div>
    </div>
  );
}
