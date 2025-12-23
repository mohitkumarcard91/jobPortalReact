import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LocationSuggestions from "../components/section/location/LocationSuggestions";
import { useStep } from "../context/FormStepContext";
import { useEffect } from "react";

export default function Location() {
  const navigate = useNavigate();
  const { markCompleted } = useStep();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const locationValue = watch("location");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("location"));
    if (stored?.value) {
      setValue("location", stored.value);
    }
  }, [setValue]);

  const isNextEnabled = locationValue?.trim();

  const onSubmit = (data) => {
    localStorage.setItem(
      "location",
      JSON.stringify({ value: data.location })
    );
    markCompleted("location");
    navigate("position");
  };

  return (
    <div className="flex flex-1 justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl"
      >
        <div className="border-2 rounded-md p-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <label className="font-bold whitespace-nowrap">
            Location:
          </label>

          <input
            type="text"
            placeholder="City, area..."
            className="flex-1 outline-none"
            {...register("location", { required: true })}
          />
        </div>

        {errors.location && (
          <p className="text-red-500 text-sm mt-1">
            Location is required
          </p>
        )}

        <div className="mt-3">
          <LocationSuggestions
            onSelect={(value) =>
              setValue("location", value, {
                shouldValidate: true,
              })
            }
          />
        </div>

       <div className="flex justify-end mt-6">
  <button
    type="submit"
    disabled={!isNextEnabled}
    className={`px-6 h-[44px] rounded-md text-white transition
      ${
        isNextEnabled
          ? "bg-slate-800 hover:text-black hover:bg-white hover:border hover:border-black"
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
}
