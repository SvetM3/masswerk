import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentCycle } from "./argEngine";

const ARGContext = createContext();

export function ARGProvider({ children }) {
  const [currentCycle, setCurrentCycle] = useState(getCurrentCycle());
  const [toolStates, setToolStates] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Check the cycle every time the app loads or updates
  useEffect(() => {
    setCurrentCycle(getCurrentCycle());
  }, []);

  // Define the strict sequence of steps for the current cycle.
  // Supports a multi-step array if provided by argEngine, or falls back to single/default steps.
  const steps = currentCycle?.steps || [
    { tool: currentCycle?.targetTool, value: currentCycle?.requiredValue }
  ].filter((s) => s.tool && s.value);

  // Function called by tools whenever inputs change
  const reportToolState = (toolName, fieldName, value) => {
    const newState = {
      ...toolStates,
      [toolName]: {
        ...(toolStates[toolName] || {}),
        [fieldName]: String(value),
      },
    };
    setToolStates(newState);

    if (isUnlocked) return; // If already unlocked, no need to check further

    const expectedStep = steps[stepIndex];

    // Check if the current action matches the expected step in sequence
    const matchesExpected =
      expectedStep &&
      toolName === expectedStep.tool &&
      String(value) === String(expectedStep.value);

    if (matchesExpected) {
      const nextIndex = stepIndex + 1;
      if (nextIndex >= steps.length) {
        // All steps successfully completed in order!
        setIsUnlocked(true);
        setStepIndex(0);
      } else {
        // Successfully hit this step, advance to the next expected step
        setStepIndex(nextIndex);
      }
    } else {
      // Any interruption, wrong input, or out-of-order action breaks the chain!
      // Check if this new action happens to be the very first step itself, otherwise reset completely.
      const matchesFirstStep =
        steps[0] &&
        toolName === steps[0].tool &&
        String(value) === String(steps[0].value);

      setStepIndex(matchesFirstStep ? 1 : 0);
    }
  };

  return (
    <ARGContext.Provider value={{ currentCycle, reportToolState, isUnlocked, setIsUnlocked }}>
      {children}
    </ARGContext.Provider>
  );
}

export const useARG = () => useContext(ARGContext);
