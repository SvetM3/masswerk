// Calculates a unique puzzle seed that changes every 3 days (72 hours)
export function getCurrentCycle() {
  const now = new Date();
  // Epoch time in milliseconds
  const epochTime = now.getTime();
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  
  // Integer representing the 3-day block we are in
  const cycleIndex = Math.floor(epochTime / threeDaysMs);
  
  // Define a few rotating puzzle challenges based on the cycle index
  const puzzles = [
    {
      id: 1,
      targetTool: "kueche",
      targetField: "grams",
      requiredValue: "142",
      hintDe: "Suche in der Küche nach der magischen Zahl 142g.",
      hintEn: "Look in the kitchen for the magic number 142g."
    },
    {
      id: 2,
      targetTool: "rem",
      targetField: "px",
      requiredValue: "32",
      hintDe: "Verwende 32 Pixel als Ausgangspunkt im REM-Rechner.",
      hintEn: "Use 32 pixels as your starting point in the REM converter."
    },
    {
      id: 3,
      targetTool: "passwort",
      targetField: "length",
      requiredValue: "20",
      hintDe: "Erhöhe die Passwort-Sicherheit auf genau 20 Zeichen.",
      hintEn: "Increase password security length to exactly 20 characters."
    }
  ];

  // Rotate through the array using modulo based on the cycle index
  return puzzles[cycleIndex % puzzles.length];
}
