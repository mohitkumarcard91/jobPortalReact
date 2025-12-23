
import { NavLink, Outlet } from "react-router-dom";
import { useStep } from "../context/FormStepContext";
import { CircleCheck } from "lucide-react";

const stepClasses = ({ isActive, isCompleted }) =>
  `flex items-center gap-2 px-4 py-2 text-sm font-medium
   ${
     isActive
       ? "text-[#5723EC]"
       : isCompleted
       ? "text-yellow-600"
       : "text-[#9A9A9A]"
   }`;

const circleClasses = ({ isActive, isCompleted }) =>
  `w-8 h-8 flex items-center justify-center rounded-full border
   ${
     isActive
       ? "bg-[#5723EC] text-white border-[#5723EC]"
       : isCompleted
       ? "bg-yellow-600 text-white border-yellow-600"
       : "text-[#9A9A9A] border-[#9A9A9A]"
   }`;

const STEPS = [
  { id: 1, key: "location", label: "Job Location", path: "/jobApply", end: true },
  { id: 2, key: "position", label: "Job Position", path: "/jobApply/position" },
  { id: 3, key: "personal", label: "Personal Details", path: "/jobApply/personal" },
];

function StepLink({ step, completedSteps }) {
  return (
    <NavLink
      to={step.path}
      end={step.end}
      className={({ isActive }) =>
        stepClasses({
          isActive,
          isCompleted: completedSteps.includes(step.key),
        })
      }
    >
      {({ isActive }) => {
        const isCompleted = completedSteps.includes(step.key);

        return (
          <>
            {isCompleted ? (
              <CircleCheck className="w-8 h-8 text-yellow-600 fill-yellow-400" />
            ) : (
              <span
                className={circleClasses({
                  isActive,
                  isCompleted,
                })}
              >
                {step.id}
              </span>
            )}
            <span>{step.label}</span>
          </>
        );
      }}
    </NavLink>
  );
}

export default function JobApplyLayout() {
  const { completedSteps } = useStep();

  return (
    <div className="flex flex-col flex-1 gap-5">
      <nav className="flex justify-around">
        {STEPS.map((step) => (
          <StepLink
            key={step.key}
            step={step}
            completedSteps={completedSteps}
          />
        ))}
      </nav>

      <hr className="border-slate-600" />
      <Outlet />
    </div>
  );
}
