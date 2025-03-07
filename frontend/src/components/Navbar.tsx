import React from "react";
import { NavLink } from "react-router-dom";
import GoogleTranslateWidget from "./GoogleTranslate";
// import GoogleTranslate from './GoogleTranslate';

function Navbar() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600 cursor-pointer font-bold"
      : "cursor-pointer hover:text-green-600";

  return (
    <div className="flex justify-between items-center">
      <div className="mt-5 ml-2">
        <img className="h-20 w-70 " src="src/assets/logo.png" alt="Logo" />
      </div>
      <div className="flex justify-between gap-5 text-3xl font-medium mr-7">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/features" className={linkClasses}>
          Features
        </NavLink>
        {/* <NavLink to="/settings" className={linkClasses}>Settings</NavLink> */}
        <div className="bg-white rounded-xl p-2 items-center border-1">
          <GoogleTranslateWidget />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
