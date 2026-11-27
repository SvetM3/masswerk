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
      deepDiveHeading: "Praktische Hinweise für reproduzierbare Ergebnisse in der Küche",
      deepDiveText:
        "Beim Backen – insbesondere bei Rührkuchen, Biskuit, Hefeteig oder Gebäck – ist eine Küchenwaage die zuverlässigste Methode. Wenn Sie dennoch mit Cups arbeiten, lockern Sie trockene Zutaten wie Mehl vor dem Messen auf, füllen Sie sie vorsichtig mit einem Löffel ein und streichen Sie den Rand glatt, anstatt den Messbecher direkt durch das Mehl zu drücken.",
      formulaTitle: "Wichtige Umrechnungsformeln & Richtwerte",
      formulaText:
        "1 US Cup entspricht exakt 236,59 ml (in Rezepten meist auf 240 ml gerundet), während 1 UK Imperial Cup 284,13 ml fasst. Für Ofentemperaturen gilt: °C = (°F − 32) × 5 ÷ 9. Bei Umluftöfen (Fan Oven) sollten Sie zusätzlich etwa 20 °C von der Ober-/Unterhitze-Angabe abziehen.",
      tableTitle: "Schnellübersicht gängiger Richtwerte",
      tableHeaders: ["Angabe / Zutat", "Richtwert / Umrechnung", "Hinweis"],
      tableRows: [
        ["1 US Cup Weizenmehl", "ca. 120–125 g", "Locker eingefüllt und glatt gestrichen"],
        ["1 US Cup Zucker (weiß)", "ca. 200 g", "Rieselfähiger Haushaltszucker"],
        ["1 US Cup Butter", "ca. 227 g", "Entspricht 2 US-Sticks bzw. 1/2 lb"],
        ["350 °F Ofentemperatur", "ca. 175–177 °C", "Bei Umluft ca. 155 °C einstellen"],
      ],
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
        {
          q: "Warum unterscheiden sich Volumenangaben bei Flüssigkeiten und trockenen Zutaten?",
          a: "Milliliter und Cups messen Raumvolumen, während Gramm das Gewicht bestimmen. 240 ml Wasser wiegen rund 240 g, während 240 ml Haferflocken oder Mehl deutlich leichter sind.",
        },
      ],
    },
    en: {
      heading: "Precision Baking: Why Weight (Grams) Beats Volume (Cups)",
      intro:
        "North American and classic British baking recipes rely heavily on volume measurements such as cups, tablespoons, and fluid ounces. Because dry ingredients vary significantly in density, 1 cup of all-purpose flour weighs far less than 1 cup of granulated sugar or butter. Scooping flour directly from a bag can pack up to 25% more weight into the cup, resulting in dense cakes or dry bread.",
      deepDiveHeading: "Practical Habits for Consistent Results Every Bake",
      deepDiveText:
        "Whenever you bake pastries, cakes, or breads, weighing ingredients in grams gives you repeatability across batches. If you do measure by volume, aerate dry ingredients first, spoon them lightly into the measuring cup, and level off the top with a straight edge rather than compacting the scoop.",
      formulaTitle: "Key Conversion Formulas & Reference Standards",
      formulaText:
        "1 US customary cup equals 236.59 ml (often rounded to 240 ml in nutrition labeling), whereas 1 UK Imperial cup equals 284.13 ml. To convert oven temperatures from Fahrenheit to Celsius, use the formula: °C = (°F − 32) × 5 ÷ 9. When baking with a convection or fan-assisted oven, reduce the converted Celsius temperature by roughly 20 °C.",
      tableTitle: "Quick Reference Conversion Table",
      tableHeaders: ["Measurement / Ingredient", "Approximate Value", "Practical Note"],
      tableRows: [
        ["1 US Cup All-Purpose Flour", "~120–125 g", "Spooned lightly and leveled"],
        ["1 US Cup Granulated Sugar", "~200 g", "Standard white cane or beet sugar"],
        ["1 US Cup Butter", "~227 g", "Equal to 2 US sticks (1/2 lb)"],
        ["350 °F Oven Temperature", "~175–177 °C", "Around 155 °C in a fan/convection oven"],
      ],
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
        {
          q: "Why do dry ingredients need weight conversions instead of pure volume?",
          a: "Volume measures space, while mass measures weight. A cup of rolled oats or cocoa powder contains air pockets between particles, so packing or tapping changes the actual amount added to your bowl.",
        },
      ],
    },
  },
  rem: {
    de: {
      heading: "CSS REM vs. Pixel: Barrierefreie und skalierbare Web-Typografie",
      intro:
        "Im modernen Webdesign sind starre Pixel-Werte (px) für Schriftgrößen und Abstände oft problematisch: Wenn Nutzer in ihren Browsereinstellungen die Standard-Schriftgröße zur besseren Lesbarkeit vergrößern, bleiben hartcodierte Pixelgrößen unverändert. Die Einheit REM (Root EM) löst dieses Problem, indem sie sich immer relativ zur Schriftgröße des HTML-Wurzelelements (<html>) berechnet.",
      deepDiveHeading: "Wann REM gegenüber PX und EM die bessere Wahl ist",
      deepDiveText:
        "REM eignet sich hervorragend für Fließtext, Überschriften, Karten-Abstände und Layout-Strukturen, weil alle Elemente sauber miteinander mitskalieren, wenn Besucher ihre Standardschriftgröße im Browser anpassen. So bleibt die visuelle Hierarchie erhalten, ohne dass verschachtelte Elemente unkontrolliert anwachsen.",
      formulaTitle: "Berechnungsformel für REM-Einheiten",
      formulaText:
        "Die Formel lautet: REM = Pixelwert ÷ Basis-Schriftgröße. Da nahezu alle modernen Browser standardmäßig eine Basis-Schriftgröße von 16 px verwenden, entsprechen 16 px genau 1 rem, 24 px entsprechen 1.5 rem und 32 px entsprechen 2 rem.",
      tableTitle: "Referenzwerte bei 16 px Basis-Schriftgröße",
      tableHeaders: ["Pixel (px)", "REM (bei 16 px)", "Typischer Einsatzbereich"],
      tableRows: [
        ["12 px", "0.75 rem", "Kleine Hinweise, Labels, Metadaten"],
        ["16 px", "1.00 rem", "Standard-Fließtext im Web"],
        ["24 px", "1.50 rem", "Zwischenüberschriften und Abschnitts-Titel"],
        ["32 px", "2.00 rem", "Hauptüberschriften (H1) auf Desktop"],
      ],
      faqs: [
        {
          q: "Warum sollte ich REM statt EM verwenden?",
          a: "Während EM sich auf das direkte Elternelement bezieht und bei verschachtelten Containern zu unerwünschten Skalierungseffekten (Compounding) führt, bleibt REM im gesamten Dokument konsistent am Wurzelelement verankert.",
        },
        {
          q: "Was bewirkt der 62,5-%-Trick in CSS?",
          a: "Setzt man html { font-size: 62.5%; }, sinkt die Basis von 16 px auf 10 px. Dadurch lässt sich im Kopf rechnen (1.4 rem = 14 px), ohne die Barrierefreiheit beim Browser-Zoom einzuschränken.",
        },
        {
          q: "Sollte ich feine Haarlinien oder Schatten ebenfalls in REM schreiben?",
          a: "Für 1-px-Rahmen (borders) wird oft weiterhin 1px verwendet, damit Linien scharf bleiben, während Schriften, Innenabstände (padding) und Außenabstände (margin) idealerweise in rem definiert werden.",
        },
        {
          q: "Wie verhält sich REM, wenn ein Nutzer eine andere Basis-Schriftgröße nutzt?",
          a: "Da REM auf der Wurzelgröße basiert, passt sich der berechnete Pixelwert automatisch an die konfigurierte Basisgröße an – genau dafür ist die Einheit gedacht.",
        },
      ],
    },
    en: {
      heading: "CSS REM vs. Pixels: Accessible & Scalable Web Typography",
      intro:
        "In responsive web development, hardcoding font sizes and spacing in pixels (px) can override user accessibility preferences. When visitors increase their browser's default font size for readability, fixed pixel declarations fail to scale. The REM (Root EM) unit solves this by scaling proportionally to the root <html> element's font size.",
      deepDiveHeading: "Choosing Between REM, EM, and Fixed Pixels",
      deepDiveText:
        "Using REM for typography, spacing tokens, and layout containers helps ensure your interface respects user font-size preferences while keeping component sizing predictable. Unlike EM, which multiplies relative to each parent element, REM stays anchored to a single root reference.",
      formulaTitle: "Pixel to REM Calculation Formula",
      formulaText:
        "The formula is straightforward: REM = Pixels ÷ Root Font Size. Because virtually all desktop and mobile browsers default to a 16 px root font size, 16 px equals 1 rem, 24 px equals 1.5 rem, and 32 px equals 2 rem.",
      tableTitle: "Common Pixel-to-REM Equivalents (16 px Base)",
      tableHeaders: ["Pixels (px)", "REM (16 px Base)", "Common UI Usage"],
      tableRows: [
        ["12 px", "0.75 rem", "Captions, helper labels, small badges"],
        ["16 px", "1.00 rem", "Default body copy and form inputs"],
        ["24 px", "1.50 rem", "Section headings and subheaders"],
        ["32 px", "2.00 rem", "Primary display headlines"],
      ],
      faqs: [
        {
          q: "What is the difference between REM and EM in CSS?",
          a: "EM inherits its scale from the immediate parent container, which can cause compounding size issues in deeply nested components. REM always references the root <html> element, ensuring predictable sizing across your entire layout.",
        },
        {
          q: "Should I use REM for media queries and padding?",
          a: "Yes. Using REM for padding, margins, and breakpoints ensures your entire layout expands harmoniously alongside your typography when users zoom in.",
        },
        {
          q: "What happens if my root font size is 20 px instead of 16 px?",
          a: "With a 20 px root, 1 rem equals 20 px, so 30 px becomes 1.5 rem. You can test custom root values directly in the converter.",
        },
        {
          q: "Are there cases where px still makes sense?",
          a: "Thin 1 px borders or hairline dividers are often kept in pixels so they do not become overly thick when text scales up.",
        },
      ],
    },
  },
  format: {
    de: {
      heading: "Seitenverhältnisse (Aspect Ratio) in Design, Video & Social Media",
      intro:
        "Das Seitenverhältnis beschreibt das proportionale Verhältnis zwischen der Breite und der Höhe eines Bildes oder Bildschirms. Werden Grafiken oder Videos ohne Berücksichtigung des korrekten Seitenverhältnisses skaliert, entstehen unschöne Verzerrungen, schwarze Balken (Letterboxing) oder wichtige Bildbereiche werden beim automatischen Zuschnitt abgeschnitten.",
      deepDiveHeading: "Verzerrungen und ungewollten Zuschnitt vermeiden",
      deepDiveText:
        "Vor dem Exportieren für Websites, Präsentationen, Videoplattformen oder Social-Media-Kanäle lohnt sich ein kurzer Blick auf das Zielformat. Wenn Ausgangs- und Zielformat stark voneinander abweichen (etwa Querformat 16:9 auf Hochformat 9:16), sollte das Motiv bewusst neu kadriert und nicht einfach gestaucht werden.",
      formulaTitle: "Proportionale Skalierung berechnen",
      formulaText:
        "Neue Höhe = (Neue Breite × Ursprüngliche Höhe) ÷ Ursprüngliche Breite. Das klassische Breitbildformat 16:9 (z. B. 1920 × 1080 px) hat einen Faktor von 1,78, während das klassische Fotoformat 4:3 einen Faktor von 1,33 aufweist.",
      tableTitle: "Beliebte Seitenverhältnisse und typische Auflösungen",
      tableHeaders: ["Verhältnis", "Beispiel-Auflösung", "Typische Verwendung"],
      tableRows: [
        ["16:9", "1920 × 1080 px", "Full-HD-Video, YouTube, Präsentationen"],
        ["16:10", "1920 × 1200 px", "Arbeitsmonitore, Laptops, Produktiv-Screens"],
        ["4:3", "1600 × 1200 px", "Klassische Fotos, Tablets, Dokument-Views"],
        ["9:16", "1080 × 1920 px", "Reels, Shorts, TikTok, Stories"],
      ],
      faqs: [
        {
          q: "Welches Seitenverhältnis eignet sich für YouTube und Web-Banner?",
          a: "16:9 ist der weltweite Standard für HD- und 4K-Videos (1920 × 1080 px oder 3840 × 2160 px) sowie für breite Hero-Header auf Websites.",
        },
        {
          q: "Welches Format nutzen Instagram Reels und TikTok?",
          a: "Vertikale Kurzvideos verwenden das Hochformat 9:16 (1080 × 1920 px), während klassische Instagram-Feed-Beiträge im 4:5-Hochformat (1080 × 1350 px) die maximale Bildschirmfläche einnehmen.",
        },
        {
          q: "Wie berechne ich die passende Höhe zu einer gegebenen Breite?",
          a: "Multiplizieren Sie die neue Breite mit der ursprünglichen Höhe und teilen Sie das Ergebnis durch die ursprüngliche Breite.",
        },
        {
          q: "Was bedeutet Aspect Ratio 1:1?",
          a: "Bei 1:1 sind Breite und Höhe exakt gleich groß – zum Beispiel 1080 × 1080 px für quadratische Profilbilder oder Produktkarten.",
        },
      ],
    },
    en: {
      heading: "Aspect Ratios in UI Design, Video Production & Social Media",
      intro:
        "An aspect ratio expresses the proportional relationship between an image or screen's width and height. Scaling assets without locking the aspect ratio leads to stretched visuals, unwanted letterboxing bars, or awkward cropping when platforms resize uploads automatically.",
      deepDiveHeading: "Preventing Stretching and Awkward Auto-Cropping",
      deepDiveText:
        "Checking target dimensions before exporting saves time across design handoffs, video edits, and social publishing. When moving between landscape and vertical placements, re-framing the subject intentionally is much cleaner than forcing an incompatible ratio.",
      formulaTitle: "Proportional Dimension Formula",
      formulaText:
        "Target Height = (Target Width × Original Height) ÷ Original Width. Standard widescreen video uses 16:9 (such as 1920 × 1080 px, ratio 1.78), while traditional photography and tablet displays commonly use 4:3 (ratio 1.33).",
      tableTitle: "Common Aspect Ratios and Resolutions",
      tableHeaders: ["Ratio", "Example Size", "Typical Context"],
      tableRows: [
        ["16:9", "1920 × 1080 px", "HD/4K video, YouTube, widescreen banners"],
        ["16:10", "1920 × 1200 px", "Laptop and productivity displays"],
        ["4:3", "1600 × 1200 px", "Classic photography and tablet layouts"],
        ["9:16", "1080 × 1920 px", "Vertical short-form video and stories"],
      ],
      faqs: [
        {
          q: "What is the standard aspect ratio for YouTube and HD video?",
          a: "16:9 is the universal widescreen standard for Full HD (1920 × 1080) and 4K UHD (3840 × 2160) video playback.",
        },
        {
          q: "Which aspect ratio performs best on vertical social feeds?",
          a: "Full-screen vertical video formats like Reels, Shorts, and TikTok require 9:16 (1080 × 1920 px), whereas portrait feed images perform best at 4:5 (1080 × 1350 px).",
        },
        {
          q: "How do I find the matching height for a new width?",
          a: "Multiply the new width by the original height, then divide by the original width.",
        },
        {
          q: "When is a 1:1 square ratio ideal?",
          a: "A 1:1 ratio (width equals height) is ideal for avatars, icons, and uniform product or gallery grids.",
        },
      ],
    },
  },
  prozent: {
    de: {
      heading: "Prozentrechnung & Mehrwertsteuer (MwSt.) sicher kalkulieren",
      intro:
        "Ob bei Rabattaktionen im Einzelhandel, Gehaltsverhandlungen, Margenkalkulationen oder der Rechnungsstellung im DACH-Raum: Prozent- und Steuerberechnungen gehören zu den häufigsten Aufgaben im Alltag. Besonders beim Herausrechnen der Mehrwertsteuer aus einem Bruttopreis unterläuft vielen ein klassischer Denkfehler.",
      deepDiveHeading: "Typische Rechenfehler bei Rabatten und Steuern vermeiden",
      deepDiveText:
        "Prozente beziehen sich immer auf den jeweiligen Ausgangswert (Grundwert). Deshalb ist eine Erhöhung um 10 % gefolgt von einer Senkung um 10 % nicht neutral, und beim Herausrechnen der Mehrwertsteuer aus dem Bruttopreis muss durch (1 + Steuersatz) geteilt werden.",
      formulaTitle: "Brutto zu Netto: So rechnen Sie die MwSt. richtig heraus",
      formulaText:
        "Um aus einem Bruttopreis mit 20 % MwSt. (Österreich) oder 19 % MwSt. (Deutschland) den Nettobetrag zu ermitteln, dürfen Sie nicht einfach 20 % abziehen. Stattdessen teilen Sie den Bruttobetrag durch 1,20 bzw. 1,19: Netto = Brutto ÷ (1 + Steuersatz).",
      tableTitle: "Wichtige Formeln für den Alltag",
      tableHeaders: ["Rechenfall", "Formel", "Kurzes Beispiel"],
      tableRows: [
        ["Aufschlag / MwSt. addieren", "Netto × (1 + p/100)", "100 € + 20 % = 120 €"],
        ["MwSt. aus Brutto rechnen", "Brutto ÷ (1 + p/100)", "120 € ÷ 1,20 = 100 €"],
        ["Rabatt abziehen", "Preis × (1 − p/100)", "80 € mit 25 % Rabatt = 60 €"],
        ["Prozentuale Änderung", "((Neu − Alt) ÷ Alt) × 100", "Von 50 auf 60 = +20 %"],
      ],
      faqs: [
        {
          q: "Wie hoch sind die regulären MwSt.-Sätze in Österreich, Deutschland und der Schweiz?",
          a: "In Österreich beträgt der Normalsteuersatz 20 % (ermäßigt 10 % bzw. 13 %), in Deutschland 19 % (ermäßigt 7 %) und in der Schweiz 8,1 % (ermäßigt 2,6 %).",
        },
        {
          q: "Warum ergibt +20 % und danach −20 % nicht wieder den Ausgangswert?",
          a: "Weil sich die zweite Prozentrechnung auf den bereits erhöhten Gesamtwert bezieht. 100 € + 20 % sind 120 €; zieht man davon 20 % ab (24 €), landet man bei 96 €.",
        },
        {
          q: "Wie berechne ich den reinen Steuerbetrag aus einem Bruttopreis?",
          a: "Ziehen Sie zuerst den berechneten Nettobetrag vom Bruttopreis ab: Steuerbetrag = Brutto − Netto.",
        },
        {
          q: "Wie ermittle ich, wie viel Prozent A von B ist?",
          a: "Teilen Sie A durch B und multiplizieren Sie das Ergebnis mit 100: (A ÷ B) × 100.",
        },
      ],
    },
    en: {
      heading: "Percentage Changes, Discounts & VAT Calculations Explained",
      intro:
        "From calculating retail discounts and profit margins to preparing invoices with Value Added Tax (VAT), percentage math is essential in daily business and personal finance. One of the most common mistakes occurs when extracting inclusive VAT from a gross total.",
      deepDiveHeading: "Avoiding Common Percentage and Tax Pitfalls",
      deepDiveText:
        "Percentages always apply to a specific base amount. Applying sequential percentage changes alters the base each step, and extracting VAT from a gross price requires dividing by one plus the tax rate rather than subtracting the percentage directly.",
      formulaTitle: "Gross to Net VAT Formula",
      formulaText:
        "To remove 20% VAT from a gross price, never subtract 20% directly from the gross total. Instead, divide the gross amount by 1.20 (or 1.19 for 19% VAT): Net Price = Gross Price ÷ (1 + VAT Rate).",
      tableTitle: "Essential Percentage & VAT Formulas",
      tableHeaders: ["Calculation Type", "Formula", "Quick Example"],
      tableRows: [
        ["Add VAT / Markup", "Net × (1 + rate/100)", "100 + 20% = 120"],
        ["Extract Net from Gross", "Gross ÷ (1 + rate/100)", "120 ÷ 1.20 = 100"],
        ["Apply Discount", "Price × (1 − disc/100)", "80 with 25% off = 60"],
        ["Percentage Change", "((New − Old) ÷ Old) × 100", "50 to 60 = +20%"],
      ],
      faqs: [
        {
          q: "What are the standard VAT rates in the DACH region?",
          a: "Austria applies a standard VAT rate of 20% (10% reduced), Germany applies 19% (7% reduced), and Switzerland applies 8.1% (2.6% reduced).",
        },
        {
          q: "How do I calculate percentage increase between two numbers?",
          a: "Subtract the original value from the new value, divide by the original value, and multiply by 100: ((New − Old) ÷ Old) × 100.",
        },
        {
          q: "Why doesn't adding 20% and then subtracting 20% return the original number?",
          a: "The second 20% is taken from the larger post-increase amount, so 100 → 120 → 96.",
        },
        {
          q: "How do I find the VAT amount included in a gross total?",
          a: "Calculate the net amount first (Gross ÷ (1 + VAT rate)) and subtract it from the gross amount.",
        },
      ],
    },
  },
  passwort: {
    de: {
      heading: "Passwortsicherheit & Entropie: Was ein Passwort unknackbar macht",
      intro:
        "Moderne Grafikprozessoren können Milliarden einfacher Passwort-Kombinationen pro Sekunde durchprobieren (Brute-Force-Angriffe). Kurze Passwörter oder bekannte Wörter mit angehängten Zahlen wie „Sommer2026!“ sind innerhalb von Sekunden kompromittiert. Entscheidend für echte Sicherheit ist die sogenannte Passwort-Entropie – also die Kombination aus Länge und Zeichenvielfalt.",
      deepDiveHeading: "Gute Praxis für Konten, Passwort-Manager und Teams",
      deepDiveText:
        "Verwenden Sie für jedes Konto ein eigenes Passwort, damit ein Datenleck an einer Stelle nicht andere Zugänge gefährdet. In Kombination mit einem Passwort-Manager und Zwei-Faktor-Authentifizierung (2FA) lassen sich auch lange, zufällige Passwörter mühelos im Alltag nutzen.",
      formulaTitle: "Warum lokale Client-Generierung entscheidend ist",
      formulaText:
        "Unser Passwort-Generator nutzt die kryptografisch sichere Web Crypto API (window.crypto.getRandomValues) direkt in Ihrem Browser. Kein generiertes Passwort wird jemals über das Internet gesendet oder auf einem Server gespeichert.",
      tableTitle: "Empfohlene Längen nach Anwendungsfall",
      tableHeaders: ["Einsatzbereich", "Empfohlene Länge", "Empfehlung"],
      tableRows: [
        ["Standard-Webkonten", "14–16 Zeichen", "Groß-/Kleinbuchstaben, Zahlen, Symbole"],
        ["E-Mail & Cloud-Konten", "16–20+ Zeichen", "Unbedingt mit 2FA kombinieren"],
        ["Master-Passwort / Tresor", "20+ Zeichen", "Einzigartig und gut merkbar/gesichert"],
        ["Router / WLAN / Admin", "16–24 Zeichen", "Keine Wörterbuchbegriffe verwenden"],
      ],
      faqs: [
        {
          q: "Wie lang sollte ein sicheres Passwort heute sein?",
          a: "Sicherheitsbehörden wie das BSI empfehlen mindestens 12 bis 16 Zeichen mit einer Mischung aus Groß- und Kleinbuchstaben, Ziffern und Sonderzeichen. Für Master-Passwörter sind 20 oder mehr Zeichen ideal.",
        },
        {
          q: "Werden meine generierten Passwörter irgendwo gespeichert?",
          a: "Nein. Die Berechnung erfolgt zu 100 % lokal auf Ihrem Endgerät. Sobald Sie den Tab schließen, existiert das Passwort nur noch in Ihrem Passwort-Manager.",
        },
        {
          q: "Ist Länge wichtiger als seltene Sonderzeichen?",
          a: "Beides hilft, aber zusätzliche Länge vergrößert den Suchraum exponentiell. Ein langes, zufälliges Passwort ist deutlich widerstandsfähiger als ein kurzes mit nur einem Sonderzeichen.",
        },
        {
          q: "Sollte ich Passwörter in Notizen oder Browser-Listen doppelt nutzen?",
          a: "Nein. Jedes Konto sollte ein eigenes Passwort erhalten, damit kompromittierte Zugangsdaten eines Dienstes nicht auf andere Konten übertragbar sind.",
        },
      ],
    },
    en: {
      heading: "Password Entropy & Security: What Makes a Password Uncrackable",
      intro:
        "Modern GPU clusters can test billions of password combinations per second using automated brute-force and dictionary attacks. Predictable substitutions like 'Summer2026!' are cracked almost instantly. True cryptographic strength comes from high entropy—combining sufficient character length with genuine randomness.",
      deepDiveHeading: "Everyday Habits That Strengthen Account Security",
      deepDiveText:
        "Avoid reusing passwords across services so a breach on one site cannot compromise others. Pairing unique generated passwords with a password manager and two-factor authentication (2FA) gives you strong security without memorizing dozens of strings.",
      formulaTitle: "100% Client-Side Cryptographic Generation",
      formulaText:
        "Maßwerk generates passwords locally in your browser using the native Web Crypto API (window.crypto.getRandomValues). Your passwords never touch a network connection, analytics log, or external server.",
      tableTitle: "Suggested Lengths by Account Importance",
      tableHeaders: ["Account Type", "Suggested Length", "Best Practice"],
      tableRows: [
        ["Everyday Accounts", "14–16 chars", "Mix uppercase, lowercase, digits, symbols"],
        ["Email & Cloud Storage", "16–20+ chars", "Always enable 2FA alongside strong passwords"],
        ["Password Manager Vault", "20+ chars", "Unique high-entropy passphrase or key"],
        ["Routers & Admin Panels", "16–24 chars", "Avoid predictable words or defaults"],
      ],
      faqs: [
        {
          q: "What is the recommended minimum password length?",
          a: "Security standards recommend at least 14 to 16 random characters mixing uppercase, lowercase, digits, and symbols. For email accounts and password manager master keys, aim for 20+ characters.",
        },
        {
          q: "Are generated passwords transmitted or logged?",
          a: "Never. All generation happens strictly inside your browser's local memory.",
        },
        {
          q: "Does length matter more than symbols?",
          a: "Adding extra characters increases combinations rapidly, making length one of the strongest contributors to password entropy.",
        },
        {
          q: "Why shouldn't I reuse the same password on multiple websites?",
          a: "If one service suffers a credential leak, attackers test those credentials elsewhere. Unique passwords isolate each account.",
        },
      ],
    },
  },
  text: {
    de: {
      heading: "Textlänge, Wortanzahl & Lesezeit für SEO, Studium und Redaktion",
      intro:
        "Ob bei wissenschaftlichen Hausarbeiten mit strengen Zeichenvorgaben, Social-Media-Beiträgen mit Zeichenlimits oder SEO-optimierten Blogartikeln: Die genaue Kontrolle über Wortanzahl, Zeichen (mit und ohne Leerzeichen) sowie Satzstruktur spart wertvolle Zeit beim Redigieren.",
      deepDiveHeading: "Klarheit, Rhythmus und Zielvorgaben im Blick behalten",
      deepDiveText:
        "Neben der reinen Wortzahl lohnt sich ein Blick auf die Satzlängen und die geschätzte Lesezeit. Sehr lange Verschachtelungen ermüden beim Lesen am Bildschirm, während klare Absätze und prägnante Formulierungen die Verständlichkeit deutlich erhöhen.",
      formulaTitle: "Wie wird die geschätzte Lesezeit berechnet?",
      formulaText:
        "Erwachsene lesen am Bildschirm durchschnittlich etwa 200 bis 225 Wörter pro Minute. Unser Rechner teilt die Gesamtanzahl der Wörter durch diesen Richtwert, damit Sie sofort sehen, wie lange Leser für Ihren Artikel oder Ihr Vortragsskript benötigen.",
      tableTitle: "Orientierungswerte für Texte und Formate",
      tableHeaders: ["Textformat", "Typischer Umfang", "Worauf es ankommt"],
      tableRows: [
        ["SEO Meta-Title", "ca. 50–60 Zeichen", "Wichtigstes Keyword früh platzieren"],
        ["SEO Meta-Description", "ca. 140–155 Zeichen", "Klare Nutzen Aussage statt Keyword-Stuffing"],
        ["DIN-A4-Normseite", "ca. 250–300 Wörter", "30 Zeilen à 60 Anschläge (1.800 Zeichen)"],
        ["Kurzbeitrag / Blog-Intro", "ca. 150–400 Wörter", "Schneller Einstieg und klare Struktur"],
      ],
      faqs: [
        {
          q: "Wie viele Wörter hat eine DIN-A4-Normseite?",
          a: "Eine klassische Normseite (30 Zeilen à 60
