
  import React from "react";
import { CaretLeft } from "Assets/svgs";

import { NavLink } from "react-router-dom";

const BackButton = ({ text = "back", link }) => {
  return (
    <div>
      <NavLink className="flex items-center gap-3 " to={link ? link : -1}>
        <CaretLeft />
        {text}
      </NavLink>
    </div>
  );
};

export default BackButton;
  