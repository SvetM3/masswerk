import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} Maßwerk ·{" "}
          {t("Alle Berechnungen laufen direkt in Ihrem Browser.")}
        </p>
        <nav
          aria-label={t("Rechtliches")}
          className="flex items-center gap-5 text-[12px] font-medium"
        >
          <Link
            to="/impressum"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t("Impressum")}
          </Link>
          <Link
            to="/datenschutz"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t("Datenschutzerklärung")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}