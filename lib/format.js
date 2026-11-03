const formatters = new Map();

function currentLocale() {
  try {
    return window.localStorage.getItem("mw-lang") === "en" ? "en-US" : "de-DE";
  } catch (e) {
    return "de-DE";
  }
}

function numberFormatter(maximumFractionDigits) {
  const key = `${currentLocale()}|${maximumFractionDigits}`;
  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(key.split("|")[0], { maximumFractionDigits })
    );
  }
  return formatters.get(key);
}

export function formatNumber(value, maximumFractionDigits = 0) {
  if (!Number.isFinite(value)) return "–";
  return numberFormatter(maximumFractionDigits).format(value);
}

export function formatQuantity(value) {
  if (!Number.isFinite(value)) return "–";
  return numberFormatter(Math.abs(value) >= 100 ? 0 : 1).format(value);
}

export function parseDecimal(input) {
  const normalized = String(input ?? "")
    .replace(/\s/g, "")
    .replace(",", ".");
  if (normalized === "") return NaN;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : NaN;
}