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
    if (!echoInput.trim() || submitted) return;
    
    setEchoes([
      { name: "You (Seeker #Current)", word: echoInput.trim(), time: "Just now" },
      ...echoes
    ]);
    setEchoesInput("");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] text-neutral-200 overflow-y-auto flex flex-col justify-between p-6 sm:p-12 animate-fade-in font-sans">
      {/* Top Navigation / Status */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center border-b border-neutral-800 pb-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-emerald-500 uppercase">
            {lang === "de" ? "● Verbindung hergestellt // Zyklus aktiv" : "● Uplink Established // Cycle Active"}
          </span>
          <h1 className="text-xl font-heading font-semibold text-white tracking-tight mt-1">
            {lang === "de" ? "Das Innere Archiv" : "The Inner Archive"}
          </h1>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="text-xs font-mono text-neutral-400 hover:text-white px-4 py-2 rounded-lg border border-neutral-800 hover:border-neutral-600 transition"
        >
          {lang === "de" ? "Zurück zur Oberfläche" : "Return to Surface ↗"}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto w-full my-auto py-12 text-center">
        <div className="inline-block p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 text-2xl">
          ❖
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-white">
          {lang === "de" ? "Du hast den Schleier durchbrochen." : "You have pierced the veil."}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {lang === "de"
            ? `Dies ist das verborgene Sanktuarium von Maßwerk. Die Frequenz dieses Zyklus (ID: ${currentCycle.id}) stimmte überein. Hier existieren keine Werkzeuge, nur Spuren derer, die vor dir aufmerksam waren.`
            : `This is the hidden sanctuary of Maßwerk. The frequency of this cycle (ID: ${currentCycle.id}) aligned. Here, utility fades—only the marks of the observant remain.`}
        </p>

        {/* Interactive Echo Wall */}
        <div className="mt-10 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-left">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
            {lang === "de" ? "Hinterlasse deinen Echo-Wort" : "Leave Your Single-Word Echo"}
          </h3>
          {!submitted ? (
            <form onSubmit={handleEchoSubmit} className="flex gap-2">
              <input
                type="text"
                maxLength={20}
                value={echoInput}
                onChange={(e) => setEchoInput(e.target.value)}
                placeholder={lang === "de" ? "Dein Wort (z.B. Klarheit)..." : "Your word (e.g., Clarity)..."}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition"
              >
                {lang === "de" ? "Senden" : "Resonate"}
              </button>
            </form>
          ) : (
            <p className="text-xs text-emerald-400 font-mono py-2">
              {lang === "de" ? "✓ Dein Echo ist im Archiv verzeichnet." : "✓ Your echo has been recorded in the archive."}
            </p>
          )}

          {/* Recent Echoes Stream */}
          <div className="mt-4 pt-4 border-t border-neutral-800/60 space-y-2">
            {echoes.map((echo, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                <span className="text-neutral-200">"{echo.word}"</span>
                <span className="text-neutral-600 text-[10px]">{echo.name} • {echo.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="max-w-4xl mx-auto w-full text-center text-[11px] font-mono text-neutral-600 border-t border-neutral-900 pt-6">
        Maßwerk Sanctuary Layer • Rotates every 72 hours.
      </div>
    </div>
  );
}
