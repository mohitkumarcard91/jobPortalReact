import { Navigate } from "react-router-dom";
import { useStep } from "../context/FormStepContext";

const STEP_ORDER = ["location", "position", "personal", "final"];

export default function ProtectedStep({ step, children }) {
  const { completedSteps } = useStep();

  const stepIndex = STEP_ORDER.indexOf(step);

  if (stepIndex === 0) {
    return children;
  }

  const previousStep = STEP_ORDER[stepIndex - 1];

  if (!completedSteps.includes(previousStep)) {
    return <Navigate to="/jobApply" replace />;
  }

  return children;
}
