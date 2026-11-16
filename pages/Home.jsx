import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const TAB_ROUTES = {
  kueche: "/kitchen-calculator",
  rem: "/px-to-rem",
  format: "/aspect-ratio",
  prozent: "/percentage-vat",
  passwort: "/password-generator",
  text: "/word-counter",
};

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

const TOOL_ARTICLES = {
  kueche: {
    de: {
      heading: "Präzises Backen: Warum Gewicht (Gramm) besser ist als Volumen (Cups)",
      intro:
        "Amerikanische und britische Backrezepte verwenden fast ausschließlich Volumeneinheiten wie Cups, Tablespoons (tbsp) und Fluid Ounces. Da Zutaten jedoch unterschiedliche Dichten besitzen, wiegt 1 Cup Mehl deutlich weniger als 1 Cup Zucker oder Butter. Schon geringe Abweichungen beim Schöpfen von Mehl können dazu führen, dass ein Kuchenteig zu trocken oder ein Brot zu kompakt wird.",
      formulaTitle: "Wichtige Umrechnungsformeln & Richtwerte",
      formulaText:
        "1 US Cup entspricht exakt 236,59 ml (in Rezepten meist auf 240 ml gerundet), während 1 UK Imperial Cup 284,13 ml fasst. Für Ofentemperaturen gilt: °C = (°F − 32) × 5 ÷ 9. Bei Umluftöfen (Fan Oven) sollten Sie zusätzlich etwa 20 °C von der Ober-/Unterhitze-Angabe abziehen.",
      faqs: [
        {
          q: "Wie viel Gramm entspricht 1 US Cup Weizenmehl?",
          a: "1 US Cup gesiebtes oder locker geschöpftes Weizenmehl (Type 405 / All-Purpose Flour) wiegt durchschnittlich 120 bis 125 Gramm. Wird das Mehl fest in den Messbecher gedrückt, kann es bis zu 150 Gramm wiegen.",
        },
        {
          q: "Was ist der Unterschied zwischen US Cups und UK Cups?",
          a: "Ein standardisierter US Cup fasst ca. 237 ml, während der traditionelle britische Imperial Cup 284 ml entspricht. Moderne britische Rezepte nutzen meist metrische Gramm-Angaben.",
        },
        {
          q: "Welche Temperatur entspricht 350 °F in Umluft?",
          a: "350 °F entsprechen 175 °C Ober-/Unterhitze. Bei einem Umluftbackofen stellen Sie idealerweise 155 °C ein, damit das Gebäck gleichmäßig bräunt und nicht austrocknet.",
        },
      ],
    },
    en: {
      heading: "Precision Baking: Why Weight (Grams) Beats Volume (Cups)",
      intro:
        "North American and classic British baking recipes rely heavily on volume measurements such as cups, tablespoons, and fluid ounces. Because dry ingredients vary significantly in density, 1 cup of all-purpose flour weighs far less than 1 cup of granulated sugar or butter. Scooping flour directly from a bag can pack up to 25% more weight into the cup, resulting in dense cakes or dry bread.",
      formulaTitle: "Key Conversion Formulas & Reference Standards",
      formulaText:
        "1 US customary cup equals 236.59 ml (often rounded to 240 ml in nutrition labeling), whereas 1 UK Imperial cup equals 284.13 ml. To convert oven temperatures from Fahrenheit to Celsius, use the formula: °C = (°F − 32) × 5 ÷ 9. When baking with a convection or fan-assisted oven, reduce the converted Celsius temperature by roughly 20 °C.",
      faqs: [
        {
          q: "How many grams are in 1 US cup of all-purpose flour?",
          a: "One US cup of spooned and leveled all-purpose flour weighs approximately 120 to 125 grams. Granulated white sugar weighs around 200 grams per cup, and butter weighs 227 grams (two standard US sticks).",
        },
        {
          q: "What is the difference between US Cups and UK Cups?",
          a: "A US cup holds 236.6 ml, while an Imperial UK cup holds 284.1 ml. Our converter lets you switch between both systems immediately so your ingredient ratios stay accurate.",
        },
        {
          q: "How do I convert 350 °F to Celsius for a fan oven?",
          a: "350 °F equals 177 °C (commonly rounded to 175 °C or Gas Mark 4). If using a fan-assisted convection oven, set the dial to 155 °C.",
        },
      ],
    },
  },
  rem: {
    de: {
      heading: "CSS REM vs. Pixel: Barrierefreie und skalierbare Web-Typografie",
      intro:
        "Im modernen Webdesign sind starre Pixel-Werte (px) für Schriftgrößen und Abstände oft problematisch: Wenn Nutzer in ihren Browsereinstellungen die Standard-Schriftgröße zur besseren Lesbarkeit vergrößern, bleiben hartcodierte Pixelgrößen unverändert. Die Einheit REM (Root EM) löst dieses Problem, indem sie sich immer relativ zur Schriftgröße des HTML-Wurzelelements (<html>) berechnet.",
      formulaTitle: "Berechnungsformel für REM-Einheiten",
      formulaText:
        "Die Formel lautet: REM = Pixelwert ÷ Basis-Schriftgröße. Da nahezu alle modernen Browser standardmäßig eine Basis-Schriftgröße von 16 px verwenden, entsprechen 16 px genau 1 rem, 24 px entsprechen 1.5 rem und 32 px entsprechen 2 rem.",
      faqs: [
        {
          q: "Warum sollte ich REM statt EM verwenden?",
          a: "Während EM sich auf das direkte Elternelement bezieht und bei verschachtelten Containern zu unerwünschten Skalierungseffekten (Compounding) führt, bleibt REM im gesamten Dokument konsistent am Wurzelelement verankert.",
        },
        {
          q: "Was bewirkt der 62,5-%-Trick in CSS?",
          a: "Setzt man html { font-size: 62.5%; }, sinkt die Basis von 16 px auf 10 px. Dadurch lässt sich im Kopf rechnen (1.4 rem = 14 px), ohne die Barrierefreiheit beim Browser-Zoom einzuschränken.",
        },
      ],
    },
    en: {
      heading: "CSS REM vs. Pixels: Accessible & Scalable Web Typography",
      intro:
        "In responsive web development, hardcoding font sizes and spacing in pixels (px) can override user accessibility preferences. When visitors increase their browser's default font size for readability, fixed pixel declarations fail to scale. The REM (Root EM) unit solves this by scaling proportionally to the root <html> element's font size.",
      formulaTitle: "Pixel to REM Calculation Formula",
      formulaText:
        "The formula is straightforward: REM = Pixels ÷ Root Font Size. Because virtually all desktop and mobile browsers default to a 16 px root font size, 16 px equals 1 rem, 24 px equals 1.5 rem, and 32 px equals 2 rem.",
      faqs: [
        {
          q: "What is the difference between REM and EM in CSS?",
          a: "EM inherits its scale from the immediate parent container, which can cause compounding size issues in deeply nested components. REM always references the root <html> element, ensuring predictable sizing across your entire layout.",
        },
        {
          q: "Should I use REM for media queries and padding?",
          a: "Yes. Using REM for padding, margins, and breakpoints ensures your entire layout expands harmoniously alongside your typography when users zoom in.",
        },
      ],
    },
  },
  format: {
    de: {
      heading: "Seitenverhältnisse (Aspect Ratio) in Design, Video & Social Media",
      intro:
        "Das Seitenverhältnis beschreibt das proportionale Verhältnis zwischen der Breite und der Höhe eines Bildes oder Bildschirms. Werden Grafiken oder Videos ohne Berücksichtigung des korrekten Seitenverhältnisses skaliert, entstehen unschöne Verzerrungen, schwarze Balken (Letterboxing) oder wichtige Bildbereiche werden beim automatischen Zuschnitt abgeschnitten.",
      formulaTitle: "Proportionale Skalierung berechnen",
      formulaText:
        "Neue Höhe = (Neue Breite × Ursprüngliche Höhe) ÷ Ursprüngliche Breite. Das klassische Breitbildformat 16:9 (z. B. 1920 × 1080 px) hat einen Faktor von 1,78, während das klassische Fotoformat 4:3 einen Faktor von 1,33 aufweist.",
      faqs: [
        {
          q: "Welches Seitenverhältnis eignet sich für YouTube und Web-Banner?",
          a: "16:9 ist der weltweite Standard für HD- und 4K-Videos (1920 × 1080 px oder 3840 × 2160 px) sowie für breite Hero-Header auf Websites.",
        },
        {
          q: "Welches Format nutzen Instagram Reels und TikTok?",
          a: "Vertikale Kurzvideos verwenden das Hochformat 9:16 (1080 × 1920 px), während klassische Instagram-Feed-Beiträge im 4:5-Hochformat (1080 × 1350 px) die maximale Bildschirmfläche einnehmen.",
        },
      ],
    },
    en: {
      heading: "Aspect Ratios in UI Design, Video Production & Social Media",
      intro:
        "An aspect ratio expresses the proportional relationship between an image or screen's width and height. Scaling assets without locking the aspect ratio leads to stretched visuals, unwanted letterboxing bars, or awkward cropping when platforms resize uploads automatically.",
      formulaTitle: "Proportional Dimension Formula",
      formulaText:
        "Target Height = (Target Width × Original Height) ÷ Original Width. Standard widescreen video uses 16:9 (such as 1920 × 1080 px, ratio 1.78), while traditional photography and tablet displays commonly use 4:3 (ratio 1.33).",
      faqs: [
        {
          q: "What is the standard aspect ratio for YouTube and HD video?",
          a: "16:9 is the universal widescreen standard for Full HD (1920 × 1080) and 4K UHD (3840 × 2160) video playback.",
        },
        {
          q: "Which aspect ratio performs best on vertical social feeds?",
          a: "Full-screen vertical video formats like Reels, Shorts, and TikTok require 9:16 (1080 × 1920 px), whereas portrait feed images perform best at 4:5 (1080 × 1350 px).",
        },
      ],
    },
  },
  prozent: {
    de: {
      heading: "Prozentrechnung & Mehrwertsteuer (MwSt.) sicher kalkulieren",
      intro:
        "Ob bei Rabattaktionen im Einzelhandel, Gehaltsverhandlungen, Margenkalkulationen oder der Rechnungsstellung im DACH-Raum: Prozent- und Steuerberechnungen gehören zu den häufigsten Aufgaben im Alltag. Besonders beim Herausrechnen der Mehrwertsteuer aus einem Bruttopreis unterläuft vielen ein klassischer Denkfehler.",
      formulaTitle: "Brutto zu Netto: So rechnen Sie die MwSt. richtig heraus",
      formulaText:
        "Um aus einem Bruttopreis mit 20 % MwSt. (Österreich) oder 19 % MwSt. (Deutschland) den Nettobetrag zu ermitteln, dürfen Sie nicht einfach 20 % abziehen. Stattdessen teilen Sie den Bruttobetrag durch 1,20 bzw. 1,19: Netto = Brutto ÷ (1 + Steuersatz).",
      faqs: [
        {
          q: "Wie hoch sind die regulären MwSt.-Sätze in Österreich, Deutschland und der Schweiz?",
          a: "In Österreich beträgt der Normalsteuersatz 20 % (ermäßigt 10 % bzw. 13 %), in Deutschland 19 % (ermäßigt 7 %) und in der Schweiz 8,1 % (ermäßigt 2,6 %).",
        },
        {
          q: "Warum ergibt +20 % und danach −20 % nicht wieder den Ausgangswert?",
          a: "Weil sich die zweite Prozentrechnung auf den bereits erhöhten Gesamtwert bezieht. 100 € + 20 % sind 120 €; zieht man davon 20 % ab (24 €), landet man bei 96 €.",
        },
      ],
    },
    en: {
      heading: "Percentage Changes, Discounts & VAT Calculations Explained",
      intro:
        "From calculating retail discounts and profit margins to preparing invoices with Value Added Tax (VAT), percentage math is essential in daily business and personal finance. One of the most common mistakes occurs when extracting inclusive VAT from a gross total.",
      formulaTitle: "Gross to Net VAT Formula",
      formulaText:
        "To remove 20% VAT from a gross price, never subtract 20% directly from the gross total. Instead, divide the gross amount by 1.20 (or 1.19 for 19% VAT): Net Price = Gross Price ÷ (1 + VAT Rate).",
      faqs: [
        {
          q: "What are the standard VAT rates in the DACH region?",
          a: "Austria applies a standard VAT rate of 20% (10% reduced), Germany applies 19% (7% reduced), and Switzerland applies 8.1% (2.6% reduced).",
        },
        {
          q: "How do I calculate percentage increase between two numbers?",
          a: "Subtract the original value from the new value, divide by the original value, and multiply by 100: ((New − Old) ÷ Old) × 100.",
        },
      ],
    },
  },
  passwort: {
    de: {
      heading: "Passwortsicherheit & Entropie: Was ein Passwort unknackbar macht",
      intro:
        "Moderne Grafikprozessoren können Milliarden einfacher Passwort-Kombinationen pro Sekunde durchprobieren (Brute-Force-Angriffe). Kurze Passwörter oder bekannte Wörter mit angehängten Zahlen wie „Sommer2026!“ sind innerhalb von Sekunden kompromittiert. Entscheidend für echte Sicherheit ist die sogenannte Passwort-Entropie – also die Kombination aus Länge und Zeichenvielfalt.",
      formulaTitle: "Warum lokale Client-Generierung entscheidend ist",
      formulaText:
        "Unser Passwort-Generator nutzt die kryptografisch sichere Web Crypto API (window.crypto.getRandomValues) direkt in Ihrem Browser. Kein generiertes Passwort wird jemals über das Internet gesendet oder auf einem Server gespeichert.",
      faqs: [
        {
          q: "Wie lang sollte ein sicheres Passwort heute sein?",
          a: "Sicherheitsbehörden wie das BSI empfehlen mindestens 12 bis 16 Zeichen mit einer Mischung aus Groß- und Kleinbuchstaben, Ziffern und Sonderzeichen. Für Master-Passwörter sind 20 oder mehr Zeichen ideal.",
        },
        {
          q: "Werden meine generierten Passwörter irgendwo gespeichert?",
          a: "Nein. Die Berechnung erfolgt zu 100 % lokal auf Ihrem Endgerät. Sobald Sie den Tab schließen, existiert das Passwort nur noch in Ihrem Passwort-Manager.",
        },
      ],
    },
    en: {
      heading: "Password Entropy & Security: What Makes a Password Uncrackable",
      intro:
        "Modern GPU clusters can test billions of password combinations per second using automated brute-force and dictionary attacks. Predictable substitutions like 'Summer2026!' are cracked almost instantly. True cryptographic strength comes from high entropy—combining sufficient character length with genuine randomness.",
      formulaTitle: "100% Client-Side Cryptographic Generation",
      formulaText:
        "Maßwerk generates passwords locally in your browser using the native Web Crypto API (window.crypto.getRandomValues). Your passwords never touch a network connection, analytics log, or external server.",
      faqs: [
        {
          q: "What is the recommended minimum password length?",
          a: "Security standards recommend at least 14 to 16 random characters mixing uppercase, lowercase, digits, and symbols. For email accounts and password manager master keys, aim for 20+ characters.",
        },
        {
          q: "Are generated passwords transmitted or logged?",
          a: "Never. All generation happens strictly inside your browser's local memory.",
        },
      ],
    },
  },
  text: {
    de: {
      heading: "Textlänge, Wortanzahl & Lesezeit für SEO, Studium und Redaktion",
      intro:
        "Ob bei wissenschaftlichen Hausarbeiten mit strengen Zeichenvorgaben, Social-Media-Beiträgen mit Zeichenlimits oder SEO-optimierten Blogartikeln: Die genaue Kontrolle über Wortanzahl, Zeichen (mit und ohne Leerzeichen) sowie Satzstruktur spart wertvolle Zeit beim Redigieren.",
      formulaTitle: "Wie wird die geschätzte Lesezeit berechnet?",
      formulaText:
        "Erwachsene lesen am Bildschirm durchschnittlich etwa 200 bis 225 Wörter pro Minute. Unser Rechner teilt die Gesamtanzahl der Wörter durch diesen Richtwert, damit Sie sofort sehen, wie lange Leser für Ihren Artikel oder Ihr Vortragsskript benötigen.",
      faqs: [
        {
          q: "Wie viele Wörter hat eine DIN-A4-Normseite?",
          a: "Eine klassische Normseite (30 Zeilen à 60 Anschläge = 1.800 Zeichen inkl. Leerzeichen) entspricht im Deutschen durchschnittlich etwa 250 bis 300 Wörtern.",
        },
        {
          q: "Was ist die optimale Länge für SEO-Meta-Beschreibungen?",
          a: "Meta-Titles sollten 50 bis 60 Zeichen nicht überschreiten, während Meta-Descriptions idealerweise zwischen 140 und 155 Zeichen inklusive Leerzeichen liegen.",
        },
      ],
    },
    en: {
      heading: "Word Count, Character Limits & Reading Time for Writers & SEO",
      intro:
        "Whether you are drafting an academic essay with strict word limits, crafting social media copy, or optimizing a blog post for search engines, tracking exact word counts, characters (with and without spaces), and sentence density helps keep your writing sharp and focused.",
      formulaTitle: "How Estimated Reading Time Is Calculated",
      formulaText:
        "The average adult reads digital screen text at roughly 200 to 225 words per minute. Our counter divides your live word count by this benchmark to give an accurate reading duration for articles, newsletters, and speeches.",
      faqs: [
        {
          q: "How many words fit on a standard single-spaced page?",
          a: "A standard single-spaced page in 12pt Times New Roman or Arial holds roughly 450 to 500 words, while a double-spaced academic page holds around 250 words.",
        },
        {
          q: "What are the ideal character counts for SEO titles and descriptions?",
          a: "Keep SEO page titles under 60 characters and meta descriptions between 145 and 155 characters (including spaces) to prevent truncation in search results.",
        },
      ],
    },
  },
};

export default function Home({ initialTab = "kueche" }) {
  const [tab, setTab] = useState(initialTab);
  const navigate = useNavigate();
  const { lang, t } = useI18n();
  const { isUnlocked } = useARG();
  const isDe = lang === "de";

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    if (TAB_ROUTES[nextTab]) {
      navigate(TAB_ROUTES[nextTab]);
    }
  };

  const currentArticle = TOOL_ARTICLES[tab]?.[lang] || TOOL_ARTICLES.kueche[lang];

  useEffect(() => {
    const seoData = TAB_SEO[tab]?.[lang] || TAB_SEO.kueche[lang];
    document.title = seoData.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seoData.desc);
    }
  }, [tab, lang]);

  // Build dynamic FAQ schema matching the visible FAQs on the active page
  const activeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: currentArticle.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="rise relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(activeFaqSchema),
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

      <TabNav active={tab} onChange={handleTabChange} />

      <div key={tab} className="rise mt-4 sm:mt-5" role="tabpanel" id={`panel-${tab}`}>
        {tab === "kueche" && <KitchenConverter />}
        {tab === "rem" && <PixelRemConverter />}
        {tab === "format" && <AspectRatioCalculator />}
        {tab === "prozent" && <PercentageCalculator />}
        {tab === "passwort" && <PasswordGenerator />}
        {tab === "text" && <WordCounter />}
      </div>

      {/* Tool-Specific Editorial Guide & Visible FAQs for AdSense & SEO */}
      <article className="mt-12 border-t border-border pt-8 sm:mt-14">
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {currentArticle.heading}
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
              {currentArticle.intro}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-secondary/30 p-5">
            <h3 className="font-heading text-[14px] font-semibold text-foreground">
              {currentArticle.formulaTitle}
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              {currentArticle.formulaText}
            </p>
          </div>

          <div className="pt-2">
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {isDe ? "Häufig gestellte Fragen (FAQ)" : "Frequently Asked Questions"}
            </h3>
            <div className="mt-4 space-y-4">
              {currentArticle.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-border/50 pb-4 last:border-none">
                  <h4 className="font-heading text-[14.5px] font-semibold text-foreground">
                    {faq.q}
                  </h4>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* About Maßwerk Footer Note */}
      <section className="mt-8 border-t border-border/60 pt-6 text-muted-foreground">
        <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
          {isDe ? "Über Maßwerk" : "About Maßwerk"}
        </h2>
        <p className="mt-1.5 max-w-3xl text-xs leading-relaxed">
          {isDe
            ? "Maßwerk bietet präzise und kostenlose Werkzeuge für alltägliche Aufgaben in Küche, Webdesign, Finanzen und Redaktion. Alle Berechnungen laufen zu 100 % clientseitig in Ihrem Browser – ohne Tracking von Eingabedaten, ohne Registrierung und ohne Verzögerung."
            : "Maßwerk provides precise, free utilities for everyday tasks across baking, web design, finance, and writing. All calculations execute 100% client-side in your browser—with zero input tracking, no sign-up required, and instant results."}
        </p>
      </section>

      {/* Render Secret Sanctuary when unlocked */}
      {isUnlocked && <SecretSanctuary />}
    </div>
  );
}
