import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function PageNotFound() {
  const location = useLocation();
  const { lang } = useI18n();
  const isDe = lang === "de";

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousContent = robotsMeta?.getAttribute("content") || "index, follow";

    if (robotsMeta) {
      robotsMeta.setAttribute("content", "noindex, nofollow");
    }

    return () => {
      if (robotsMeta) {
        robotsMeta.setAttribute("content", previousContent);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-muted-foreground/40">404</h1>
          <div className="h-0.5 w-16 bg-border mx-auto" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-heading font-semibold">
            {isDe ? "Seite nicht gefunden" : "Page Not Found"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isDe ? (
              <>
                Die angeforderte Adresse{" "}
                <span className="font-mono text-foreground">{location.pathname}</span>{" "}
                existiert nicht.
              </>
            ) : (
              <>
                The requested path{" "}
                <span className="font-mono text-foreground">{location.pathname}</span>{" "}
                could not be found.
              </>
            )}
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition"
          >
            {isDe ? "Zurück zu den Rechnern" : "Back to Calculators"}
          </Link>
        </div>
      </div>
    </div>
  );
}
