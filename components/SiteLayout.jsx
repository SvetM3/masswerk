import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Ruler } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import SiteFooter from "@/components/SiteFooter";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

export default function SiteLayout() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-foreground text-background transition-transform duration-300 group-hover:-rotate-6">
              <Ruler className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
              Maßwerk
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:inline">
              {t("Sofortrechner")}
            </span>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <AdSlot placement="top" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-12 sm:px-6">
        <Outlet />
      </main>

      <AdSlot placement="bottom" />
      <SiteFooter />
    </div>
  );
}