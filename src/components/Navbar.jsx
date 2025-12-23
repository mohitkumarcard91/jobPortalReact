import { NavLink } from "react-router-dom";
import {
  CircleUserRound,
  BadgeQuestionMark,
  Briefcase,
  ClipboardList,
} from "lucide-react";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `flex gap-3 px-4 ml-2 py-3 text-sm font-medium border-r-4  
      
     ${
       isActive
         ? "bg-slate-700 text-white border-amber-400"
         : "text-slate-300 border-transparent hover:bg-slate-800 hover:text-white"
     }`;

  return (
    <nav className="flex flex-col h-full  gap-8 group">
      <NavLink to="/" className={linkClasses}>
        <CircleUserRound className="h-5 w-5 shrink-0" />
        <span
          className="opacity-0
    translate-x-[-10px]
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-x-0
    whitespace-nowrap"
        >
          Profile
        </span>
      </NavLink>

      <NavLink to="/jobApply" className={linkClasses}>
        <Briefcase className="h-5 w-5 shrink-0" />

        <span
          className="opacity-0
    translate-x-[-10px]
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-x-0
    whitespace-nowrap"
        >
          Apply for job
        </span>
      </NavLink>

      <NavLink to="/personal" className={linkClasses}>
        <ClipboardList className="h-5 w-5 shrink-0" />

        <span
          className="opacity-0
    translate-x-[-10px]
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-x-0
    whitespace-nowrap "
        >
          Applied job list
        </span>
      </NavLink>

      <NavLink to="/final" className={linkClasses}>
        <BadgeQuestionMark className="h-5 w-5 shrink-0" />
        <span
          className="opacity-0
    translate-x-[-10px]
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-x-0
    whitespace-nowrap"
        >
          Help & support
        </span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
