import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentCycle } from "./argEngine";

const ARGContext = createContext();

export function ARGProvider({ children }) {
  const [currentCycle, setCurrentCycle] = useState(getCurrentCycle());
  const [toolStates, setToolStates] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [toast, setToast] = useState(null);

  // Check the cycle every time the app loads or updates
  useEffect(() => {
    setCurrentCycle(getCurrentCycle());
  }, []);

  const steps = currentCycle?.steps || [
    { tool: currentCycle?.targetTool, field: currentCycle?.targetField, value: currentCycle?.requiredValue }
  ].filter((s) => s.tool && s.value);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const reportToolState = (toolName, fieldName, value) => {
    const stringVal = String(value).trim();
    if (!stringVal) return;

    const newState = {
      ...toolStates,
      [toolName]: {
        ...(toolStates[toolName] || {}),
        [fieldName]: stringVal,
      },
    };
    setToolStates(newState);

    if (isUnlocked) return;

    const expectedStep = steps[stepIndex];
    if (!expectedStep) return;

    // Check if the current action matches the exact expected next step in sequence
    const matchesExpected =
      toolName === expectedStep.tool && stringVal === String(expectedStep.value);

    if (matchesExpected) {
      const nextIndex = stepIndex + 1;
      if (nextIndex >= steps.length) {
        setIsUnlocked(true);
        setStepIndex(0);
        setToast({ message: "The veil parts completely...", type: "success" });
      } else {
        setStepIndex(nextIndex);
        setToast({ message: `You found key ${nextIndex} of ${steps.length}`, type: "progress" });
      }
    } else {
      // STRICT SEQUENCE RULE:
      // If we have already found the first key (stepIndex > 0), ANY interaction with 
      // another tool or wrong input immediately resets progress back to 0!
      if (stepIndex > 0) {
        const firstStep = steps[0];
        const isRestartingFirstStep = toolName === firstStep?.tool && stringVal === String(firstStep?.value);

        if (isRestartingFirstStep) {
          setStepIndex(1);
          setToast({ message: `You found key 1 of ${steps.length}`, type: "progress" });
        } else {
          setStepIndex(0);
          setToast({ message: "The frequency destabilized. Sequence reset.", type: "reset" });
        }
      } else {
        // At step 0, if they try a future step out of order, give the warning toast
        const futureStepIndex = steps.findIndex(
          (s, idx) => idx > 0 && s.tool === toolName && String(s.value) === stringVal
        );
        if (futureStepIndex !== -1) {
          setToast({ message: "A resonance stirs, but something must precede this...", type: "warning" });
        }
      }
    }
  };

  return (
    <ARGContext.Provider value={{ currentCycle, reportToolState, isUnlocked, setIsUnlocked }}>
      {children}

      {/* Floating 5-Second ARG Popup Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-border/80 bg-card/90 px-4 py-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sanctuary Resonance
            </p>
            <p className="text-[13px] font-medium text-foreground">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </ARGContext.Provider>
  );
}

export const useARG = () => useContext(ARGContext);
