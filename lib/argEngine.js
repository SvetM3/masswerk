// Calculates a unique puzzle seed that changes every 3 days (72 hours)
export function getCurrentCycle() {
  const now = new Date();
  // Epoch time in milliseconds
  const epochTime = now.getTime();
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  
  // Integer representing the 3-day block we are in
  const cycleIndex = Math.floor(epochTime / threeDaysMs);
  
  // Define multi-step puzzle challenges based on the cycle index
  const puzzles = [
    {
      id: 1,
      steps: [
        { tool: "kueche", field: "grams", value: "142" },
        { tool: "rem", field: "px", value: "32" }
      ],
      hintDe: "Finde zuerst 142g in der Küche, gefolgt von 32px im REM-Rechner.",
      hintEn: "Find 142g in the kitchen first, followed by 32px in the REM converter."
    },
    {
      id: 2,
      steps: [
        { tool: "rem", field: "px", value: "32" },
        { tool: "passwort", field: "length", value: "20" }
      ],
      hintDe: "Beginne mit 32px im REM-Rechner und erzeuge direkt danach ein 20-Zeichen-Passwort.",
      hintEn: "Start with 32px in the REM converter, then immediately generate a 20-character password."
    },
    {
      id: 3,
      steps: [
        { tool: "passwort", field: "length", value: "20" },
        { tool: "kueche", field: "grams", value: "142" }
      ],
      hintDe: "Setze die Passwort-Länge auf 20, und gib danach direkt 142g in der Küche ein.",
      hintEn: "Set password length to 20, then directly input 142g in the kitchen."
    }
  ];

  // Rotate through the array using modulo based on the cycle index
  return puzzles[cycleIndex % puzzles.length];
}
