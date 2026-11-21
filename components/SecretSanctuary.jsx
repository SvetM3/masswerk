import React, { useState } from "react";
import { useARG } from "@/lib/ARGContext";
import { useI18n } from "@/lib/i18n";

export default function SecretSanctuary() {
  const { currentCycle, setIsUnlocked } = useARG();
  const { lang } = useI18n();
  const [echoInput, setEchoInput] = useState("");
  const [echoes, setEchoes] = useState([
    { name: "Seeker #42", word: "Aethelgard", time: "2 hrs ago" },
    { name: "Seeker #19", word: "Resonance", time: "Yesterday" }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleEchoSubmit = (e) => {
    e.preventDefault();
    const cleaned = echoInput.trim().split(/\s+/)[0]; // Keep it a true single-word echo
    if (!cleaned || submitted) return;

    setEchoes([
      {
        name: lang === "de" ? "Du (Sucher #Aktuell)" : "You (Seeker #Current)",
        word: cleaned,
        time: lang === "de" ? "Gerade eben" : "Just now"
      },
      ...echoes
    ]);
    setEchoInput("");
    setSubmitted(true);
  };

  const cycleId = currentCycle?.id ?? "—";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07080a] text-neutral-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Ambient Radial Frequency Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.11),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.06),transparent_45%)]"
      />

      {/* Subtle Scanline Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.6)_0px,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_4px)]"
      />

      <div className="relative z-10 flex min-h-full flex-col justify-between px-5 py-6 sm:px-10 sm:py-10">
        {/* Top Telemetry Header */}
        <header className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 border-b border-emerald-950/80 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-emerald-400/90 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {lang === "de"
                  ? `Verbindung hergestellt // Zyklus #${cycleId}`
                  : `Uplink Established // Cycle #${cycleId}`}
              </span>
            </div>
            <h1 className="mt-1.5 font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
              {lang === "de" ? "Das Innere Archiv" : "The Inner Archive"}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsUnlocked(false)}
            className="rounded-lg border border-neutral-800/90 bg-neutral-900/70 px-3.5 py-2 font-mono text-xs text-neutral-300 backdrop-blur-sm transition hover:border-emerald-500/40 hover:bg-neutral-900 hover:text-emerald-300"
          >
            {lang === "de" ? "Zurück zur Oberfläche ↗" : "Return to Surface ↗"}
          </button>
        </header>

        {/* Center Sanctuary Chamber */}
        <main className="mx-auto my-auto w-full max-w-2xl py-10 text-center sm:py-14">
          <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-2xl text-emerald-400 shadow-[0_0_35px_-8px_rgba(16,185,129,0.45)]">
            ❖
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-500/80">
            {lang === "de" ? "Frequenz synchronisiert" : "Frequency Synchronized"}
          </p>

          <h2 className="mt-2 font-heading text-2xl font-medium tracking-tight text-white sm:text-4xl">
            {lang === "de" ? "Du hast den Schleier durchbrochen." : "You have pierced the veil."}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">
            {lang === "de"
              ? `Dies ist das verborgene Sanktuarium von Maßwerk. Die Frequenz dieses Zyklus (ID: ${cycleId}) stimmte überein. Hier verblasst der Nutzen – nur die Spuren der Aufmerksamen bleiben.`
              : `This is the hidden sanctuary of Maßwerk. The frequency of this cycle (ID: ${cycleId}) aligned. Here, utility fades—only the marks of the observant remain.`}
          </p>

          {/* Echo Chamber Card */}
          <section className="mt-9 rounded-2xl border border-neutral-800/90 bg-[#0c0e12]/85 p-5 text-left shadow-2xl backdrop-blur-md sm:p-7">
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                {lang === "de" ? "Hinterlasse dein Ein-Wort-Echo" : "Leave Your Single-Word Echo"}
              </h3>
              <span className="font-mono text-[10px] text-emerald-500/70">
                {echoes.length} {lang === "de" ? "Spuren" : "traces"}
              </span>
            </div>

            {!submitted ? (
              <form onSubmit={handleEchoSubmit} className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="text"
                  maxLength={24}
                  value={echoInput}
                  onChange={(e) => setEchoInput(e.target.value)}
                  placeholder={lang === "de" ? "Dein Wort (z.B. Klarheit)..." : "Your word (e.g., Clarity)..."}
                  className="flex-1 rounded-xl border border-neutral-800 bg-[#07080a] px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/15"
                />
                <button
                  type="submit"
                  className="rounded-xl border border-emerald-400/30 bg-emerald-600/90 px-5 py-2.5 font-mono text-xs font-medium tracking-wide text-white shadow-[0_0_20px_-6px_rgba(16,185,129,0.6)] transition hover:bg-emerald-500 active:scale-[0.99]"
                >
                  {lang === "de" ? "Resonieren" : "Resonate"}
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/25 px-3.5 py-2.5 font-mono text-xs text-emerald-300">
                <span>✦</span>
                <span>
                  {lang === "de"
                    ? "Dein Echo ist im Archiv verzeichnet."
                    : "Your echo has been recorded in the archive."}
                </span>
              </div>
            )}

            {/* Recent Echoes Stream */}
            <div className="mt-5 divide-y divide-neutral-800/70 border-t border-neutral-800/80 pt-2">
              {echoes.map((echo, idx) => (
                <div
                  key={`${echo.name}-${idx}`}
                  className="flex items-center justify-between gap-4 py-2.5 font-mono text-xs transition hover:bg-white/[0.015] px-1 rounded"
                >
                  <span className="text-emerald-200/95 tracking-wide">“{echo.word}”</span>
                  <span className="text-[11px] text-neutral-500 shrink-0">
                    {echo.name} • {echo.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer Meta */}
        <footer className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 border-t border-neutral-900 pt-5 font-mono text-[11px] text-neutral-600">
          <span>
            {lang === "de"
              ? "Maßwerk Sanktuarium-Ebene • Rotiert alle 72 Stunden"
              : "Maßwerk Sanctuary Layer • Rotates every 72 hours"}
          </span>
          <span className="text-neutral-700">FREQ // 72H-CYCLE</span>
        </footer>
      </div>
    </div>
  );
}
