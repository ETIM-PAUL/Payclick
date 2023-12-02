
import React from "react";
import { NavLink } from "react-router-dom";
const AddButton = ({ link }) => {
  return (
    <>
      <NavLink to={link} className="w-7 h-7 text-center center-svg text-white font-bold bg-blue-500 hover:bg-blue-700 flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          {" "}
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
        </svg>
      </NavLink>
    </>
  );
};

export default AddButton;

