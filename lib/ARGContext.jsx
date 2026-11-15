import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentCycle } from "./argEngine";

const ARGContext = createContext();

export function ARGProvider({ children }) {
  const [currentCycle, setCurrentCycle] = useState(getCurrentCycle());
  const [toolStates, setToolStates] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCurrentCycle(getCurrentCycle());
  }, []);

  const steps = currentCycle?.steps || [
    { tool: currentCycle?.targetTool, field: currentCycle?.targetField, value: currentCycle?.requiredValue }
  ].filter((s) => s.tool && s.value);

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

    // If the user is just re-typing or staying on the current expected step, do nothing (prevent accidental resets)
    if (toolName === expectedStep.tool && stringVal === String(expectedStep.value)) {
      const nextIndex = stepIndex + 1;
      if (nextIndex >= steps.length) {
        setIsUnlocked(true);
        setStepIndex(0);
        setToast({ message: "The veil parts completely...", type: "success" });
      } else {
        // Only advance if we weren't already at this step index
        // To prevent spamming toasts while typing, check if stepIndex just advanced
        setStepIndex(nextIndex);
        setToast({ message: `You found key ${nextIndex} of ${steps.length}`, type: "progress" });
      }
      return;
    }

    // Check if they are typing on the FIRST step (to allow restarting cleanly)
    const firstStep = steps[0];
    const isFirstStepAction = toolName === firstStep.tool && stringVal === String(firstStep.value);

    // If they are currently at step > 0, but typing something completely unrelated/wrong that doesn't match expected or first step:
    // Let's be forgiving with partial typing (e.g. typing "3" before "32"), so only reset if they type a full conflicting value in another tool.
    if (stepIndex > 0 && !isFirstStepAction) {
      // If they switch tools entirely to a non-target tool with a non-empty value, or type a wrong value
      if (toolName !== expectedStep.tool && stringVal.length > 0) {
        // Optional: you can decide if switching tools resets. For now, let's keep progress unless they submit a wrong final value.
      }
    }
  };

  return (
    <ARGContext.Provider value={{ currentCycle, reportToolState, isUnlocked, setIsUnlocked }}>
      {children}

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

export const useARG = () => useContext(ARGContext);import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentCycle } from "./argEngine";

const ARGContext = createContext();

export function ARGProvider({ children }) {
  const [currentCycle, setCurrentCycle] = useState(getCurrentCycle());
  const [toolStates, setToolStates] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCurrentCycle(getCurrentCycle());
  }, []);

  const steps = currentCycle?.steps || [
    { tool: currentCycle?.targetTool, field: currentCycle?.targetField, value: currentCycle?.requiredValue }
  ].filter((s) => s.tool && s.value);

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

    // If the user is just re-typing or staying on the current expected step, do nothing (prevent accidental resets)
    if (toolName === expectedStep.tool && stringVal === String(expectedStep.value)) {
      const nextIndex = stepIndex + 1;
      if (nextIndex >= steps.length) {
        setIsUnlocked(true);
        setStepIndex(0);
        setToast({ message: "The veil parts completely...", type: "success" });
      } else {
        // Only advance if we weren't already at this step index
        // To prevent spamming toasts while typing, check if stepIndex just advanced
        setStepIndex(nextIndex);
        setToast({ message: `You found key ${nextIndex} of ${steps.length}`, type: "progress" });
      }
      return;
    }

    // Check if they are typing on the FIRST step (to allow restarting cleanly)
    const firstStep = steps[0];
    const isFirstStepAction = toolName === firstStep.tool && stringVal === String(firstStep.value);

    // If they are currently at step > 0, but typing something completely unrelated/wrong that doesn't match expected or first step:
    // Let's be forgiving with partial typing (e.g. typing "3" before "32"), so only reset if they type a full conflicting value in another tool.
    if (stepIndex > 0 && !isFirstStepAction) {
      // If they switch tools entirely to a non-target tool with a non-empty value, or type a wrong value
      if (toolName !== expectedStep.tool && stringVal.length > 0) {
        // Optional: you can decide if switching tools resets. For now, let's keep progress unless they submit a wrong final value.
      }
    }
  };

  return (
    <ARGContext.Provider value={{ currentCycle, reportToolState, isUnlocked, setIsUnlocked }}>
      {children}

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
