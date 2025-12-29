import { ThumbsUp } from "lucide-react";
import { useStep } from "../context/FormStepContext";
import { useEffect } from "react";

const Final = () => {
  const { resetSteps } = useStep();

  useEffect(() => {
    localStorage.removeItem("location");
    localStorage.removeItem("position");
    localStorage.removeItem("personal");
  }, []);

    const handleClick = () => {
    resetSteps();
    router.replace("/");
  };
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <ThumbsUp className="text-yellow-500 stroke-current stroke-2 w-52 h-52" />
      <div className="flex flex-col items-center mt-3 gap-1">
        <p className="font-semibold text-[20px]">
          {" "}
          We've received your application!
        </p>
        <p>We will process it and reach out to you in a days</p>
         <button
          onClick={handleClick}
          type="submit"
          className={`px-6 h-[44px] rounded-md text-white transition bg-slate-800  hover:text-black hover:bg-white hover:border hover:border-black`}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Final;
