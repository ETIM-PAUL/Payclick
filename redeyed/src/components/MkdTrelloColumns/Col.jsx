import React from "react";

const Col = ({ isOver, children }) => {
  const className = isOver
    ? "bg-[#f5eaea] min-h-[6.25rem] rounded-[.3125rem]"
    : "";

  return (
    <div
      className={` w-[15.625rem] ${
        isOver ? "min-h-[6.25rem] rounded-[.3125rem] bg-[#a5a2a2]" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Col;

          