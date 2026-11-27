import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function Datenschutz() {
  const { lang } = useI18n();
  const isDe = lang === "de";

  useEffect(() => {
    document.title = isDe
      ? "Datenschutzerklärung | Maßwerk"
      : "Privacy Policy | Maßwerk";
  }, [isDe]);

  const faqs = isDe
    ? [
        {
          q: "Werden meine Rechnereingaben (z. B. Beträge, Texte, Passwörter) an einen Server gesendet?",
          a: "Nein. Die Werkzeuge auf Maßwerk arbeiten lokal im Browser. Generierte Passwörter, eingegebene Texte oder Zahlenwerte werden nicht für die Berechnung an einen eigenen Server übermittelt.",
        },
        {
          q: "Wofür wird localStorage verwendet?",
          a: "Der Browser speichert lokal Einstellungen wie Sprache (mw-lang) oder Farbschema (mw-theme), damit Ihre Präferenzen beim nächsten Besuch erhalten bleiben.",
        },
        {
          q: "Wie funktionieren Google AdSense und Cookies / Einwilligungen?",
          a: "Auf der Website ist Google AdSense eingebunden. Je nach Region und Einwilligungsstatus können Google und Partner Cookies oder ähnliche Technologien verwenden, um Anzeigen auszuliefern, deren Häufigkeit zu begrenzen oder personalisierte bzw. nicht-personalisierte Werbung anzuzeigen.",
        },
        {
          q: "Wie kann ich den Betreiber bei Datenschutzfragen kontaktieren und welche Rechte habe ich nach der DSGVO?",
          a: "Bei Fragen zum Datenschutz können Sie sich an sofortrechner@gmx.net wenden. Im Rahmen der DSGVO haben Sie insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch sowie Beschwerde bei einer Aufsichtsbehörde.",
        },
      ]
    : [
        {
          q: "Are my tool inputs (such as numbers, text, or generated passwords) sent to a server?",
          a: "No. Calculators and generators run locally in your browser rather than sending your entered figures, text, or passwords to a backend server for processing.",
        },
        {
          q: "What is stored in localStorage?",
          a: "Preferences such as interface language and theme selection may be saved locally in your browser so your chosen view persists across visits.",
        },
        {
          q: "How does Google AdSense interact with browser storage and consent?",
          a: "Google AdSense is integrated to support free access to the tools. Google and advertising partners may use cookies or similar technologies to serve ads, cap frequency, and measure ad performance in line with Google's privacy disclosures.",
        },
        {
          q: "How can I contact the site regarding privacy, and what rights do I have under GDPR?",
          a: "For privacy inquiries, you can write to sofortrechner@gmx.net. Under GDPR, you have rights to access, rectification, erasure, restriction, portability, objection, and lodging a complaint with a supervisory authority.",
        },
      ];

  return (
    <div className="rise mx-auto max-w-3xl py-8 sm:py-12 space-y-8 text-foreground">
      <div className="space-y-2 border-b border-border pb-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {isDe ? "Datenschutz & Transparenz" : "Privacy & Transparency"}
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight">
          {isDe ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isDe
            ? "Diese Datenschutzerklärung informiert darüber, wie personenbezogene und technische Daten bei der Nutzung von Maßwerk (masswerktools.com) verarbeitet werden."
            : "This notice explains how technical and personal data are handled when visiting and using Maßwerk (masswerktools.com)."}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "1. Lokale Verarbeitung in den Werkzeugen" : "1. Client-Side Tool Processing"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Alle Rechner und Generatoren – darunter Küchen-Umrechnungen, Pixel-in-REM, Seitenverhältnisse, Prozent- und MwSt.-Rechner, Passwort-Generator und Wortzähler – werden unmittelbar im Browser ausgeführt. Ihre Eingaben verbleiben in Ihrer lokalen Sitzung und werden nicht in einer eigenen Datenbank gespeichert."
            : "All tools on Maßwerk—including kitchen conversions, px-to-rem math, aspect ratios, percentage and VAT calculations, password generation, and word counting—execute directly in your browser. Inputs remain in your local browser session and are not stored in a proprietary database."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "2. Server-Protokolle & lokaler Speicher" : "2. Server Logs & Local Storage"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Beim Aufruf der Website übermittelt Ihr Browser technisch notwendige Verbindungsdaten (wie IP-Adresse, Zeitpunkt des Abrufs, angeforderte Ressource, Browser-Kennung und Referrer) an den Hosting-Dienstleister, um die Auslieferung, Stabilität und Sicherheit der Website zu gewährleisten. Zudem werden Oberflächeneinstellungen (Sprache und Dark/Light-Modus) lokal im Browser gespeichert."
            : "When you load the site, your browser sends standard connection metadata (such as IP address, timestamp, requested URL, user agent, and referrer) to the hosting provider to deliver pages reliably and maintain security. UI preferences like language and theme may also be stored locally in your browser."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "3. Werbeanzeigen (Google AdSense)" : "3. Advertising (Google AdSense)"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Zur Finanzierung des kostenlosen Angebots ist Google AdSense eingebunden. Google und angeschlossene Werbepartner können Cookies oder ähnliche Technologien einsetzen, um Anzeigen auszuliefern, deren Häufigkeit zu steuern und Reichweiten-/Leistungsmessungen durchzuführen. Weitere Informationen zur Datenverarbeitung durch Google finden Sie in den Datenschutzbestimmungen von Google."
            : "Google AdSense is integrated to support free access to the tools. Google and advertising partners may use cookies or similar technologies to serve ads, cap frequency, and measure ad performance in line with Google's privacy disclosures."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">
          {isDe ? "4. Ihre Rechte & Kontakt" : "4. Your Rights & Contact"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isDe
            ? "Sie haben im Rahmen der geltenden Datenschutzgesetze (insbesondere der DSGVO) das Recht auf Auskunft über gespeicherte personenbezogene Daten, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie Beschwerde bei einer zuständigen Datenschutz-Aufsichtsbehörde. Für Anfragen zum Datenschutz erreichen Sie uns unter "
            : "Under applicable data protection laws (including GDPR), you have rights to request access, correction, deletion, restriction, or portability of personal data where applicable, to object to processing, and to contact a supervisory authority. For privacy requests, contact "}
          <a
            href="mailto:sofortrechner@gmx.net"
            className="font-mono text-foreground underline underline-offset-4 hover:opacity-80"
          >
            sofortrechner@gmx.net
          </a>
          {isDe ? "." : "."}
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
        <Link to="/impressum" className="text-muted-foreground hover:text-foreground transition">
          {isDe ? "Impressum →" : "Imprint →"}
        </Link>
      </div>
    </div>
  );
}
