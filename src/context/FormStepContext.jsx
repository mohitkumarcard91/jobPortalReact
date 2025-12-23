import { createContext, useContext, useState } from "react";

const STEP_ORDER = ["location", "position", "personal", "final"];

const FormStepContext = createContext(null);

export function FormStepProvider({ children }) {
  
  const [completedSteps, setCompletedSteps] = useState([]);

  const markCompleted = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev : [...prev, step]
    );
  };


  const canAccessStep = (step) => {
    const stepIndex = STEP_ORDER.indexOf(step);

    if (stepIndex === 0) return true;

    const previousStep = STEP_ORDER[stepIndex - 1];
    return completedSteps.includes(previousStep);
  };

  const resetSteps = () => {
    setCompletedSteps([]);
  };

  return (
    <FormStepContext.Provider
      value={{
        completedSteps,
        markCompleted,
        canAccessStep,
        resetSteps,
        STEP_ORDER,
      }}
    >
      {children}
    </FormStepContext.Provider>
  );
}


export function useStep() {
  const context = useContext(FormStepContext);
  if (!context) {
    throw new Error("useStep must be used inside FormStepProvider");
  }
  return context;
}
