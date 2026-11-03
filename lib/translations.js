// Wörterbuch Deutsch → Englisch. Schlüssel sind die deutschen Originaltexte.
export const translations = {
  en: {
    // Navigation & Shell
    "Sofortrechner": "Instant converter",
    "Rechner auswählen": "Select calculator",
    "Sprache": "Language",
    "Werbung": "Advertisement",
    "Alle Berechnungen laufen direkt in Ihrem Browser.":
      "All calculations run directly in your browser.",
    "Rechtliches": "Legal",
    "Impressum": "Legal notice",
    "Datenschutzerklärung": "Privacy policy",
    "← Zurück zum Rechner": "← Back to the calculator",

    // Startseite
    "Sofort umrechnen.": "Instant calculation.",
    "Cups in Gramm, Fahrenheit in Celsius, Pixel in REM – in Sekunden, direkt im Browser und ohne Anmeldung.":
      "Cups to grams, Fahrenheit to Celsius, pixels to REM – in seconds, straight in your browser and without signing up.",
    "Wofür Sie den Rechner nutzen": "What you can use the calculator for",
    "Backen": "Baking",
    "Cups, Ounces und Gasstufen direkt in Gramm, Milliliter und Grad Celsius umrechnen – ohne Tabellen suchen.":
      "Convert cups, ounces and gas marks straight into grams, millilitres and degrees Celsius – no table lookups needed.",
    "Web & Design": "Web & design",
    "Pixelwerte in REM übertragen, mit jeder Basis-Schriftgröße – für konsistente Typografie im Projekt.":
      "Turn pixel values into REM at any base font size – for consistent typography in your project.",
    "Bildformate": "Image formats",
    "Seitenverhältnisse prüfen und neue Bildmaße proportional berechnen, bevor der Export startet.":
      "Check aspect ratios and calculate new image dimensions proportionally before you export.",
    "Steuern & Finanzen": "Taxes & math",
    "Prozentuale Unterschiede berechnen und regionale MwSt.-Sätze in Sekunden aufschlagen oder herausrechnen.":
      "Calculate percentage differences and add or remove regional VAT rates in seconds.",
    "Sicherheit": "Security",
    "Starke, anpassbare Passwörter direkt im Browser erzeugen – ganz ohne Übertragung Ihrer Daten.":
      "Generate strong, customisable random passwords right in your browser without transmitting any data.",
    "Text & Schreiben": "Text & copy",
    "Wörter, Zeichen, Sätze und die geschätzte Lesezeit live zählen, während Sie tippen oder einfügen.":
      "Count words, characters, sentences and estimated reading time live as you type or paste.",

    // Tabs
    "Küchen-Rechner": "Kitchen Calculator",
    "Pixel in REM": "Pixels to REM",
    "Seitenverhältnis": "Aspect Ratio",
    "Prozent & MwSt.": "Percentage & VAT",
    "Passwort-Generator": "Password Generator",
    "Wortzähler": "Word Counter",

    // Zutaten-Umrechner
    "Zutaten-Umrechner": "Ingredient Converter",
    "US & UK → metrisch": "US & UK → metric",
    "Zutat": "Ingredient",
    "Menge": "Amount",
    "Menge & Einheit": "Amount & unit",
    "Schnellwahl": "Quick pick",
    "Ergebnis": "Result",
    "entspricht ca. {value} {unit}": "equals approx. {value} {unit}",
    "Bitte eine Menge größer als 0 eingeben.": "Please enter an amount greater than 0.",
    "Richtwerte: 1 Cup (US) ≈ 237 ml · 1 Cup (UK) ≈ 284 ml · 1 EL = 15 ml · 1 TL = 5 ml. Je nach Zutat und Körnung können die Grammwerte leicht abweichen.":
      "Reference values: 1 cup (US) ≈ 237 ml · 1 cup (UK) ≈ 284 ml · 1 tbsp = 15 ml · 1 tsp = 5 ml. Gram values may vary slightly depending on ingredient and grind.",

    // Einheiten
    "EL": "tbsp",
    "TL": "tsp",
    "Unze": "oz",

    // Zutatengruppen
    "Mehl & Getreide": "Flour & grains",
    "Zucker & Süßes": "Sugar & sweets",
    "Fette & Flüssiges": "Fats & liquids",
    "Nüsse & Backzutaten": "Nuts & baking ingredients",

    // Zutaten
    "Mehl (Type 405)": "Flour (type 405)",
    "Mehl (Type 1050)": "Flour (type 1050)",
    "Vollkornmehl": "Wholemeal flour",
    "Haferflocken": "Oats",
    "Grieß": "Semolina",
    "Reis (roh)": "Rice (raw)",
    "Zucker (weiß)": "Sugar (white)",
    "Zucker (braun)": "Sugar (brown)",
    "Puderzucker": "Icing sugar",
    "Kakaopulver": "Cocoa powder",
    "Honig": "Honey",
    "Butter": "Butter",
    "Margarine": "Margarine",
    "Öl": "Oil",
    "Milch": "Milk",
    "Sahne": "Cream",
    "Wasser": "Water",
    "Mandeln (gemahlen)": "Almonds (ground)",
    "Speisestärke": "Cornflour",
    "Salz": "Salt",
    "Backpulver": "Baking powder",

    // Backtemperatur
    "Backtemperatur": "Baking temperature",
    "°F & Gasstufe → °C": "°F & gas mark → °C",
    "Fahrenheit": "Fahrenheit",
    "Gasstufe": "Gas mark",
    "Temperatur in °F": "Temperature in °F",
    "Bitte eine Temperatur eingeben.": "Please enter a temperature.",
    "Ober-/Unterhitze": "Conventional oven",
    "Umluft": "Fan oven",
    "Werte sind auf handelsübliche Ofenstufen gerundet. Umluft entspricht in der Regel 20 °C weniger als Ober-/Unterhitze.":
      "Values are rounded to common oven settings. Fan ovens are usually 20 °C lower than conventional.",

    // Pixel in REM
    "px ÷ Basis = rem": "px ÷ base = rem",
    "Pixelwert": "Pixel value",
    "Basis-Schriftgröße": "Base font size",
    "Basis verkleinern": "Decrease base size",
    "Basis vergrößern": "Increase base size",
    "1 rem = {rem} px · 1 px = {px} rem": "1 rem = {rem} px · 1 px = {px} rem",
    "Der REM-Wert bezieht sich auf die Schriftgröße des Wurzelelements – im Browser standardmäßig 16 px.":
      "The REM value refers to the root element font size – 16 px by default in browsers.",
    "Häufige Werte": "Common values",
    "Basis {px} px": "Base {px} px",
    "Pixel": "Pixels",
    "REM": "REM",
    "Vorschau": "Preview",
    "Schnell umgerechnet": "Quickly converted",

    // Seitenverhältnis
    "Breite : Höhe": "Width : Height",
    "Breite": "Width",
    "Höhe": "Height",
    "Verhältnis": "Ratio",
    "Bitte gültige Werte eingeben.": "Please enter valid values.",
    "Neue Größe berechnen": "Calculate new size",
    "proportional skalieren": "scale proportionally",
    "Breite vorgeben": "Set width",
    "Höhe vorgeben": "Set height",
    "Neue Breite in px": "New width in px",
    "Neue Höhe in px": "New height in px",
    "Ergibt Höhe": "Resulting height",
    "Ergibt Breite": "Resulting width",
    "Bitte ein Seitenverhältnis und einen Wert angeben.":
      "Please enter an aspect ratio and a value.",

    // Prozent & MwSt.
    "MwSt. berechnen": "Calculate VAT",
    "Betrag ± MwSt.": "Amount ± VAT",
    "Aufschlagen": "Add",
    "Herausrechnen": "Remove",
    "Betrag": "Amount",
    "MwSt.-Satz": "VAT rate",
    "Eigener Satz": "Custom rate",
    "Netto": "Net",
    "MwSt.": "VAT",
    "Brutto": "Gross",
    "Bitte einen Betrag eingeben.": "Please enter an amount.",
    "Prozentrechnung": "Percentage calculator",
    "Prozentwert": "Percentage value",
    "Prozentsatz": "Percentage",
    "Grundwert": "Base value",
    "Veränderung": "Change",
    "Von": "From",
    "Auf": "To",
    "Zunahme": "Increase",
    "Abnahme": "Decrease",
    "Keine Veränderung": "No change",
    "Bitte Werte eingeben.": "Please enter values.",

    // Passwort-Generator
    "Länge": "Length",
    "Zahlen": "Numbers",
    "Symbole": "Symbols",
    "Kopieren": "Copy",
    "Kopiert": "Copied",
    "Neu erzeugen": "Generate new",
    "sicher generiert": "securely generated",
    "Passwörter entstehen zufällig im Browser und werden nicht übertragen oder gespeichert.":
      "Passwords are generated randomly in your browser and are never transmitted or stored.",

    // Wortzähler
    "Zeichen- & Wortzähler": "Character & Word Counter",
    "Text einfügen oder tippen …": "Paste or type your text …",
    "Wörter": "Words",
    "Zeichen": "Characters",
    "Zeichen ohne Leerzeichen": "Characters without spaces",
    "Sätze": "Sentences",
    "Lesezeit": "Reading time",
    "Min.": "min",
    "live gezählt": "counted live",
  },
};

export function translate(lang, key, vars) {
  const text = lang === "en" ? translations.en[key] ?? key : key;
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    vars[name] === undefined ? match : String(vars[name])
  );
}