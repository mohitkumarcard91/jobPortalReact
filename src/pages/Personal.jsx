import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStep } from "../context/FormStepContext";
import { useEffect,useState } from "react";

const Personal = () => {
  const { markCompleted } = useStep();
  const navigate = useNavigate();
  const [locationDisplay, setLocationDisplay] = useState("");
const [positionDisplay, setPositionDisplay] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const nameValue = watch("name");
  const phoneValue = watch("phone");


  useEffect(() => {
  const storedPersonal = JSON.parse(localStorage.getItem("personal"));
  if (storedPersonal) {
    setValue("name", storedPersonal.name || "");
    setValue("phone", storedPersonal.phone || "");
  }

  const storedLocation = JSON.parse(localStorage.getItem("location"));
  if (storedLocation?.value) {
    setLocationDisplay(storedLocation.value);
  }

  const storedPosition = JSON.parse(localStorage.getItem("position"));
  if (storedPosition) {
    const text = storedPosition.text || "";
    const selected = storedPosition.selected || [];
    const combined = [text, ...selected].filter(Boolean).join(", ");
    setPositionDisplay(combined);
  }


    const stored = JSON.parse(localStorage.getItem("personal"));
    if (stored) {
      setValue("name", stored.name || "");
      setValue("phone", stored.phone || "");
    }
  }, [setValue]);

  const isNextEnabled = nameValue?.trim() && phoneValue?.trim();

  const onSubmit = (data) => {
    localStorage.setItem("personal", JSON.stringify(data));
    markCompleted("personal");
    navigate("/jobApply/final");
  };

  return (
    <div className="flex flex-1 justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[700px]"
      >

<div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4 bg-slate-50">
  <label className="text-lg font-bold whitespace-nowrap">
    Location:
  </label>
  <input
    type="text"
    value={locationDisplay}
    readOnly
    className="flex-1 border-none outline-none bg-transparent text-slate-700 cursor-not-allowed"
  />
</div>

<div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6 bg-slate-50">
  <label className="text-lg font-bold whitespace-nowrap">
    Position:
  </label>
  <input
    type="text"
    value={positionDisplay}
    readOnly
    className="flex-1 border-none outline-none bg-transparent text-slate-700 cursor-not-allowed"
  />
</div>

        <div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="text-lg font-bold whitespace-nowrap">
            Name:
          </label>
          <input
            className="flex-1 border-none outline-none"
            type="text"
            placeholder="e.g. John"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              Required
            </span>
          )}
        </div>

        <div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-4">
          <label className="text-lg font-bold whitespace-nowrap">
            Phone:
          </label>
          <input
            className="flex-1 border-none outline-none"
            type="tel"
            placeholder="e.g. 0123456789"
            {...register("phone", { required: true })}
          />
          <Search className="hidden sm:block" />
          {errors.phone && (
            <span className="text-red-500 text-sm">
              Required
            </span>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/jobApply/position")}
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

export default Personal;
