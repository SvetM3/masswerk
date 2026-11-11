import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentCycle } from "./argEngine";

const ARGContext = createContext();

export function ARGProvider({ children }) {
  const [currentCycle, setCurrentCycle] = useState(getCurrentCycle());
  const [toolStates, setToolStates] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Check the cycle every time the app loads or updates
  useEffect(() => {
    setCurrentCycle(getCurrentCycle());
  }, []);

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

    // Check if the current user input matches the active 3-day cycle requirement
    if (
      toolName === currentCycle.targetTool &&
      String(value) === String(currentCycle.requiredValue)
    ) {
      setIsUnlocked(true);
    }
  };

  return (
    <ARGContext.Provider value={{ currentCycle, reportToolState, isUnlocked, setIsUnlocked }}>
      {children}
    </ARGContext.Provider>
  );
}

export const useARG = () => useContext(ARGContext);
