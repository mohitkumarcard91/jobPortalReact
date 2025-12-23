import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStep } from "../context/FormStepContext";
import { useEffect } from "react";

const SUGGESTIONS = [
  "360 Operator",
  "Site Manager",
  "Project Manager",
  "Steel Fixer",
];

const Position = () => {
  const { markCompleted } = useStep();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      positionText: "",
      selectedPositions: [],
    },
  });

  const positionText = watch("positionText");
  const selectedPositions = watch("selectedPositions");

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("position"));
    if (stored) {
      setValue("positionText", stored.text || "");
      setValue("selectedPositions", stored.selected || []);
    }
  }, [setValue]);

 
  const isNextEnabled =
    positionText.trim() !== "" || selectedPositions.length > 0;

  const onSubmit = (data) => {
    const payload = {
      text: data.positionText,
      selected: data.selectedPositions,
    };

    localStorage.setItem("position", JSON.stringify(payload));
    markCompleted("position");
    navigate("/jobApply/personal");
  };

  return (
    <div className="flex flex-1 justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[700px]"
      >
        <div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="text-lg font-bold whitespace-nowrap">
            Roles:
          </label>
          <input
            className="flex-1 border-none outline-none text-base"
            type="text"
            placeholder="Job title, position..."
            {...register("positionText")}
          />
          <Search className=" sm:block" />
        </div>

        <div className="mt-4">
          <label className="text-lg font-semibold">
            SUGGESTIONS
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {SUGGESTIONS.map((item) => (
              <label
                key={item}
                className="border-2 rounded-md p-3 flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={item}
                  {...register("selectedPositions")}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

       
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/jobApply")}
            className="px-6 h-[44px] rounded-md border border-slate-400 hover:bg-black hover:text-white"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={!isNextEnabled}
            className={`px-6 h-[44px] rounded-md text-white transition
              ${
                isNextEnabled
                  ? "bg-slate-800  hover:text-black hover:bg-white hover:border hover:border-black"
                  : "bg-slate-400 cursor-not-allowed"
              }
            `}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Position;
