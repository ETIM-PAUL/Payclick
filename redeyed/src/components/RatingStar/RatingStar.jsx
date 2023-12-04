import { StarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const RatingStar = ({ rate = 0, onSetRate }) => {
  const [rateValue, setRateValue] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleClick = (number) => {
    if (rateValue === number) {
      onSetRate(0);
      if (setRateValue) {
        setRateValue(0);
      }
    } else {
      onSetRate(number);
      if (setRateValue) {
        setRateValue(number);
      }
    }
  };
  useEffect(() => {
    setRateValue(rate);
  }, [rate]);


  const handleMouseOver = (e) => {
    if (e.target.id) {
      if (e.target.id.includes("path_")) {
        setHoveredIndex(e.target.id.replace("path_", "").trim());
      } else {
        setHoveredIndex(e.target.id);
      }
    }
  };

  const handleMouseOut = () => {
    setHoveredIndex(0);
  };

  return (
    <>
      <div
        className="flex gap-5  text-lg text-black"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <span>
          <StarIcon
            id={1}
            className={`h-12 w-12 cursor-pointer font-bold ${
              hoveredIndex >= 1 ? "text-yellow-200" : ""
            } ${rateValue >= 1 ? "text-yellow-400 " : "text-gray-500"}`}
            onClick={() => handleClick(1)}
          />
        </span>
        <span>
          <StarIcon
            id={2}
            className={`h-12 w-12  cursor-pointer font - bold ${
              hoveredIndex >= 2 ? "text-yellow-200" : ""
            } ${ rateValue >= 2 ? "text-yellow-400 " : "text-gray-500" }`}

            onClick={() => handleClick(2)}
          />
        </span>
        <span>
          <StarIcon
            id={3}
            className={`h-12 w-12  cursor-pointer font-bold ${
              hoveredIndex >= 3 ? "text-yellow-200" : ""
            } ${rateValue >= 3 ? "text-yellow-400 " : "text-gray-500"}`}
            onClick={() => handleClick(3)}
          />
        </span>
        <span>
          <StarIcon
            id={4}
            className={`h-12 w-12  cursor-pointer font-bold ${
              hoveredIndex >= 4 ? "text-yellow-200" : ""
            } ${rateValue >= 4 ? "text-yellow-400 " : "text-gray-500"}`}
            onClick={() => handleClick(4)}
          />
        </span>
        <span>
          <StarIcon
            id={5}
            className={`h-12 w-12  cursor-pointer font-bold ${
              hoveredIndex >= 5 ? "text-yellow-200" : ""
            } ${rateValue === 5 ? "text-yellow-400 " : "text-gray-500"}`}
            onClick={() => handleClick(5)}
          />
        </span>
      </div>
    </>
  );
};

export default RatingStar;
